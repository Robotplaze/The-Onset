namespace SpriteKind {
    export const asteroid = SpriteKind.create()
    export const enemyprojectile = SpriteKind.create()
    export const Boss = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let index = 0; index < 30; index++) {
        projectile = sprites.createProjectileFromSprite(img`
            5 5 
            5 5 
            5 5 
            5 5 
            `, mySprite, 0, -100)
        pause(10)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.asteroid, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value += -1
    info.changeScoreBy(-1)
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    mySprite.destroy()
    game.over(false, effects.bubbles)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.asteroid, function (sprite, otherSprite) {
    otherSprite.destroy(effects.coolRadial, 500)
    info.changeScoreBy(1)
})
let missile: Sprite = null
let boss_health_bar: StatusBarSprite = null
let boss1: Sprite = null
let asteroid_sprite: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . f 6 6 f . . . . . . 
    . . . . . . f 6 6 f . . . . . . 
    . . . . . f 6 6 6 6 f . . . . . 
    . . . . . f 6 6 6 6 f . . . . . 
    . . . . f 6 6 6 6 6 6 f . . . . 
    . . . . f 6 6 6 6 6 6 f . . . . 
    . . . f 6 6 6 6 6 6 6 6 f . . . 
    . . . f 6 f f f 6 f f 6 f . . . 
    . . f 6 6 f 6 f 6 6 f 6 6 f . . 
    . . f 6 6 f f f 6 6 f 6 6 f . . 
    . f 6 6 6 f 6 6 6 6 f 6 6 6 f . 
    . f 6 6 6 f 6 6 6 f f f 6 6 f . 
    . f f f f f f f f f f f f f f . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite.setPosition(75, 100)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.max = 10
statusbar.attachToSprite(mySprite)
let counter = 0
info.setScore(0)
game.onUpdateInterval(5000, function () {
    for (let index = 0; index < 5; index++) {
        asteroid_sprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . f f f f f f f f f f f f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 f f 5 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f f f f f f f f f f f f . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.asteroid)
        asteroid_sprite.setPosition(randint(0, 160), 0)
        asteroid_sprite.setVelocity(0, 20)
        counter += 1
    }
})
game.onUpdateInterval(500, function () {
    if (counter >= 10) {
        counter = 0
        boss1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . c . . . . . . . . c . . . 
            . . c b c c c c c c c c b c . . 
            . . c b c b b b b b b c b c . . 
            . c b c b b b b b b b b c b c . 
            . c b c b b b b b b b b c b c . 
            c b c b b b b b b b b b b c b c 
            b c c c c c c c c c c c c c c b 
            b c f f f f f f f f f f f f c b 
            b c f f f f f f f f f f f f c b 
            b c c c c c c c c c c c c c c b 
            c 4 4 4 4 4 4 4 4 4 4 4 4 4 2 c 
            . c c c c c c c c c c c c c c . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Boss)
        boss_health_bar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
        boss_health_bar.max = 100
        boss_health_bar.value = 100
        boss_health_bar.setLabel("BOSS:", 2)
        mySprite.setPosition(75, 5)
        for (let index = 0; index < 15; index++) {
            boss1.setPosition(randint(0, 160), 15)
            missile = sprites.create(img`
                b 5 5 b 
                b 5 5 b 
                b 2 2 b 
                b b b b 
                `, SpriteKind.asteroid)
            boss1.setPosition(randint(0, 160), 0)
            missile.setVelocity(0, 50)
            animation.runImageAnimation(
            missile,
            [img`
                c c 4 4 4 4 c c 
                c c 4 4 4 4 c c 
                c c 4 4 4 4 c c 
                c c 4 4 4 4 c c 
                c c 2 2 2 2 c c 
                c c 2 2 2 2 c c 
                c c c c c c c c 
                c c c c c c c c 
                `,img`
                b b 5 5 5 5 b b 
                b b 5 5 5 5 b b 
                b b 5 5 5 5 b b 
                b b 5 5 5 5 b b 
                b b 2 2 2 2 b b 
                b b 2 2 2 2 b b 
                b b b b b b b b 
                b b b b b b b b 
                `],
            100,
            true
            )
        }
    }
})
game.onUpdateInterval(100, function () {
    projectile = sprites.createProjectileFromSprite(img`
        1 1 
        1 1 
        1 1 
        1 1 
        `, mySprite, 0, -100)
})
