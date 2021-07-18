import {makeAutoObservable, autorun} from "mobx";
import {createContext, FC, useContext} from "react";
import {LightenDarkenColor} from "../helpers/LightenColor";
import {ShuffleElements} from "../helpers/SuffleArrayElements";

interface IColorCellOptions {
    color: string
}

class CellsStore {
    private originalOrderedSet = this.generateCells();
    private originalOrderJson = JSON.stringify({cells: this.originalOrderedSet});

    public cells = ShuffleElements(this.originalOrderedSet);
    public pickedCells = new Set();
    public steps = 0; // indicate how many steps player make
    public isOrderValid: boolean = false // indicate if game is over

    constructor() {
        makeAutoObservable(this)
        autorun(() => {
            if (this.pickedCells.size === 2) {
                this.updateCellsGroup();
            }
            // im don't put compare order function here in case of senseless updates due state updates
        });
    }


    public setPickedCell = (index: number): void => {
        if (this.pickedCells.has(index)) { // cancel picking
            const updatedSet = new Set(this.pickedCells)
            updatedSet.delete(index)
            this.pickedCells = updatedSet;
            return;
        }

        let updatedSet = new Set(this.pickedCells)
        updatedSet.add(index)

        // make it shorter bc we can pick only two colors
        if (updatedSet.size > 2) {
            const tempArr = Array.from(updatedSet);
            updatedSet = new Set(tempArr.slice(-2))
        }
        this.pickedCells = updatedSet;
    }

    public isCellPicked = (index: number): boolean => {
        return this.pickedCells.has(index);
    }

    private updateCellsGroup = (): void => {
        if (this.pickedCells.size < 2) {
            console.error('updateCellsGroup error: picked cells should have two elements!')
            return;
        }
        const [first, second]: [number, number] = Array.from(this.pickedCells) as [number, number];

        const tempCellsArray = this.cells;
        [tempCellsArray[first], tempCellsArray[second]] = [tempCellsArray[second], tempCellsArray[first]];
        this.cells = tempCellsArray;
        this.pickedCells = new Set();
        this.steps = this.steps + 1;
        console.log(this.steps )
        this.compareOrder();
    }

    public resetGame = (): void => {
        this.originalOrderedSet = this.generateCells();
        this.originalOrderJson = JSON.stringify({cells: this.originalOrderedSet});
        this.shuffleCells();
        this.isOrderValid = false;
    }

    public shuffleCells = (): void => {
        this.cells = ShuffleElements(this.originalOrderedSet);
    }

    private compareOrder(): void {
        const currentOrderJson = JSON.stringify({cells: this.cells});
        this.isOrderValid = this.originalOrderJson === currentOrderJson;
    }

    private generateCells(): IColorCellOptions[] {
        const cellsAmount = 32;
        const colorsPresets = ['#8a1212','#731649','#717714', '#188120', '#144547', '#141747']
        const randomColorIndex = Math.floor(Math.random() * (colorsPresets.length - 0)) + 0
        const cells: IColorCellOptions[] = [];

        let currentCellColor = colorsPresets[randomColorIndex];

        for (let i = 0; i < cellsAmount; i++) {
            cells.push({
                color: currentCellColor
            })
            currentCellColor = LightenDarkenColor(currentCellColor, 5);
        }
        return cells;
    }
}

const StoreContext = createContext<CellsStore>(new CellsStore());

const StoreProvider: FC<{ store: CellsStore }> = ({store, children}) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

const useStore = () => {
    return useContext(StoreContext)
}

export {CellsStore, StoreProvider, useStore}
