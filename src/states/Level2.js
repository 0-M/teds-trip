import { LevelPrototype } from './LevelPrototype';


class Level2 extends LevelPrototype {


    preload() {
        super.preload()
    }
    create () {
        super.create()
    }
    setupPlatforms() {
        super.setupPlatforms()
        this.createPlatform(400, this.game.world.height - 600, 'floor2', 3)
        this.createPlatform(2000, this.game.world.height - 1200, 'floor2', 4)
        this.createPlatform(3000, this.game.world.height - 600, 'floor2', 3)
        this.createPlatform(5000, this.game.world.height - 1200, 'floor2', 4)
    }
}