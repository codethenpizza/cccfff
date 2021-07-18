import {CSSProperties, FC} from "react";
import {LightenDarkenColor} from "../helpers/LightenColor";
import {useStore} from "../store/CellsStore";
import { observer } from "mobx-react-lite";

interface IColorCellProps {
    color: string
    index: number
}

const ColorCell: FC<IColorCellProps> = ({color, index}) => {
    const {isCellPicked, setPickedCell} = useStore();

    const styleOptions: CSSProperties = {
        background: `linear-gradient(0deg, ${color}, ${LightenDarkenColor(color, 2)})`,
        ...(isCellPicked(index) ? {
            boxShadow: '0 0 18px 2px #060606',
            zIndex: 999,
        } : {})
    }

    return (
        <div
            className={'colorCell'}
            style={styleOptions}
            onClick={() => setPickedCell(index)}
        />
    )
}

export default observer(ColorCell)
