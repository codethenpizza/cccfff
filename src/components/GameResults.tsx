import {FC} from "react";
import { observer } from "mobx-react";
import {useStore} from "../store/CellsStore";

const GameResults: FC = () => {
    const {resetGame, steps} = useStore();

    return (
        <div className={'gameResults'}>
            <h2>Congrats!</h2>
            <h3>Steps you've make: {steps} <br/> Once more?</h3>
            <button onClick={() => resetGame()}>
                Sure
            </button>
        </div>
    )
}

export default observer(GameResults)
