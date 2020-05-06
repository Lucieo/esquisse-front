import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import DrawingTools from "./DrawingTools";
import applyCountdown from "components/Counter/applyCountdown";
import { SUBMIT_PAGE } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";
import "./Drawing.css";

const DrawingMode = ({ lastPage, finished, pageId }) => {
    const [brushColor, setBrushColor] = useState("#000000");
    const [brushRadius, setBrushRadius] = useState(2);
    const [content, setContent] = useState("");
    const [submitPage, { loading, error }] = useMutation(SUBMIT_PAGE, {
        variables: {
            content: content && content.getSaveData(),
            pageId,
        },
        onCompleted: () => {
            console.log("PAGE SUBMITTED ", pageId, "with content ", content);
        },
    });

    useEffect(() => {
        if (finished) {
            console.log("THIS IS THE END SUBMIT NOW");
            submitPage();
            setTimeout(function () {
                console.log("SUBMITTING AGAIN CAPORAL!");
                submitPage();
            }, 2000);
        }
    }, [finished]);

    return (
        <div className="drawing-mode">
            <div className="row">
                <div className="col m4 s12">
                    <DrawingTools
                        setBrushColor={setBrushColor}
                        setBrushRadius={setBrushRadius}
                        content={content}
                        brushRadius={brushRadius}
                        content={content}
                    />
                </div>
                <div className="col m8 s12">
                    <div className="center">
                        <p>LE MOT A DESSINER EST</p>
                        <h3>{lastPage.content}</h3>
                        <p>
                            Votre dessin sera automatiquement envoyé à la fin du
                            chrono!
                        </p>
                    </div>
                    <CanvasDraw
                        ref={(canvasDraw) => setContent(canvasDraw)}
                        brushRadius={brushRadius}
                        lazyRadius={2}
                        brushColor={brushColor}
                        className="drawing-mode__canvas"
                        disabled={finished}
                        hideGrid={finished}
                        canvasWidth={450}
                        canvasHeight={400}
                    />
                </div>
            </div>
        </div>
    );
};

export default applyCountdown(DrawingMode);
