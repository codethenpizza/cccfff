import {FC} from "react";
import GameResults from "../components/GameResults";
import CellsWrap from "../components/CellsWrap";
import {useStore} from "../store/CellsStore";
import {observer} from "mobx-react-lite";

const Home: FC = () => {
    const {isOrderValid} = useStore();

    return (
        <>
            {
                isOrderValid ? <GameResults/> : <CellsWrap/>
            }
        </>
    )
}

export default observer(Home)
