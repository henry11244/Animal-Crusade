const Jump = (entities, { input }) => {
    const { payload } = input.find((x) => x.name === "onKeyDown") || {};
    console.log(input);
    if (payload) {
        if (payload.key === " ") {
            const dot = entities["dot"];
            dot.y = dot.y + -100;
            setTimeout(() => {
                dot.y = dot.y + 100;
            }, 300);
        }
    }

    return entities;
};

const GameControls = (entities, { events }) => {
    if (events.length) {
        const gameStarted =
            events.find((x) => x.type === "started") ||
            events.find((x) => x.type === "unpaused");
        const gameStopped = events.find((x) => x.type === "pause");

        if (gameStarted) {
            const blocks = entities["blocks"];
            blocks.running = true;

            const dot = entities["dot"];
            dot.running = true;
        } else if (gameStopped) {
            const blocks = entities["blocks"];
            blocks.running = false;

            const dot = entities["dot"];
            dot.running = false;
        }
    }
    return entities;
};

export { Jump, GameControls };