

export class Runtime {
    private interval?: NodeJS.Timeout;
    private frame: () => void;
    public FPS = 60;
    constructor(frame: () => void) {
        this.frame = frame;
    }

    run = () => {
        this.interval = setInterval(this.frame, 1 / this.FPS);
    };

    stop = () => {
        if (!this.interval) return;
        clearInterval(this.interval);
        this.interval = undefined;
        this.frame();
    };


}