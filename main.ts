namespace SpriteKind {
    export const asteroid = SpriteKind.create()
    export const enemyprojectile = SpriteKind.create()
    export const Boss = SpriteKind.create()
    export const Powerup1 = SpriteKind.create()
}
statusbars.onDisplayUpdated(StatusBarKind.EnemyHealth, function (status, image2) {
    for (let index = 0; index < 3; index++) {
        missile = sprites.create(img`
            c c 4 4 4 4 c c 
            c c 4 4 4 4 c c 
            c c 4 4 4 4 c c 
            c c 4 4 4 4 c c 
            c c 2 2 2 2 c c 
            c c 2 2 2 2 c c 
            c c c c c c c c 
            c c c c c c c c 
            `, SpriteKind.Player)
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
        missile.setPosition(randint(0, 160), 0)
        missile.setVelocity(0, 50)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.asteroid, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value += -1
    info.changeScoreBy(-1)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    boss1.destroy()
    countdown += 1
})
statusbars.onZero(StatusBarKind.Health, function (status) {
    mySprite.destroy()
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.asteroid, function (sprite2, otherSprite2) {
    otherSprite2.destroy(effects.coolRadial, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Powerup1, function (sprite, otherSprite) {
    otherSprite.destroy(effects.smiles, 500)
})
sprites.onOverlap(SpriteKind.Boss, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    boss_health_bar.value += -2
})
let projectile: Sprite = null
let Machine_gun_powerup: Sprite = null
let counter = 0
let asteroid_sprite: Sprite = null
let boss_health_bar: StatusBarSprite = null
let countdown = 0
let boss1: Sprite = null
let missile: Sprite = null
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
game.onUpdateInterval(5000, function () {
    for (let index = 0; index < 2; index++) {
        Machine_gun_powerup = sprites.create(img`
            . . 9 9 9 9 . . 
            . 9 9 9 9 9 9 . 
            9 f 9 9 f f f 9 
            f f f 9 f 9 f 9 
            9 f 9 9 f f f 9 
            9 9 9 9 f 9 9 9 
            . 9 9 9 f 9 9 . 
            . . 9 9 9 9 . . 
            `, SpriteKind.Powerup1)
        Machine_gun_powerup.setPosition(randint(0, 140), 0)
        Machine_gun_powerup.setVelocity(0, 50)
    }
})
game.onUpdateInterval(5000, function () {
    for (let index = 0; index < 3; index++) {
        missile = sprites.create(img`
            c c 4 4 4 4 c c 
            c c 4 4 4 4 c c 
            c c 4 4 4 4 c c 
            c c 4 4 4 4 c c 
            c c 2 2 2 2 c c 
            c c 2 2 2 2 c c 
            c c c c c c c c 
            c c c c c c c c 
            `, SpriteKind.Player)
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
        missile.setPosition(randint(0, 160), 0)
        missile.setVelocity(0, 50)
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
        boss_health_bar = statusbars.create(40, 4, StatusBarKind.EnemyHealth)
        boss_health_bar.max = 100
        boss_health_bar.value = 100
        boss_health_bar.setLabel("BOSS:", 2)
        boss_health_bar.setPosition(75, 5)
        boss1.setPosition(randint(0, 160), 15)
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
