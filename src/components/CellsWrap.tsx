import {FC} from "react";
import ColorCell from "./ColorCell";
import {useStore} from "../store/CellsStore";
import {observer} from "mobx-react";

const CellsWrap: FC = () => {
    const {cells, shuffleCells} = useStore();

    return (
        <div className={'cellWrap'}>
            {cells.map((cell, i) =>
                <ColorCell
                    key={i}
                    index={i}
                    color={cell.color}
                />
            )}
        </div>
    )
}

export default observer(CellsWrap);
