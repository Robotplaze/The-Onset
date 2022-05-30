@namespace
class SpriteKind:
    asteroid = SpriteKind.create()
    enemyprojectile = SpriteKind.create()
    Boss = SpriteKind.create()
    Powerup1 = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    statusbar.value += -1
    info.change_score_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.asteroid, on_on_overlap)

def on_on_zero(status):
    mySprite.destroy()
    game.over(False, effects.bubbles)
statusbars.on_zero(StatusBarKind.health, on_on_zero)

def on_on_overlap2(sprite2, otherSprite2):
    otherSprite2.destroy(effects.cool_radial, 500)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.asteroid, on_on_overlap2)

projectile: Sprite = None
missile: Sprite = None
boss_health_bar: StatusBarSprite = None
boss1: Sprite = None
Machine_gun_powerup: Sprite = None
asteroid_sprite: Sprite = None
statusbar: StatusBarSprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
mySprite.set_position(75, 100)
controller.move_sprite(mySprite, 100, 0)
mySprite.set_stay_in_screen(True)
statusbar = statusbars.create(20, 4, StatusBarKind.health)
statusbar.max = 10
statusbar.attach_to_sprite(mySprite)
counter = 0
info.set_score(0)

def on_update_interval():
    global asteroid_sprite, counter
    for index in range(5):
        asteroid_sprite = sprites.create(img("""
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
            """),
            SpriteKind.asteroid)
        asteroid_sprite.set_position(randint(0, 160), 0)
        asteroid_sprite.set_velocity(0, 20)
        counter += 1
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    global Machine_gun_powerup
    Machine_gun_powerup = sprites.create(img("""
            . . 9 9 9 9 . . 
                    . 9 9 9 9 9 9 . 
                    9 f 9 9 f f f 9 
                    f f f 9 f 9 f 9 
                    9 f 9 9 f f f 9 
                    9 9 9 9 f 9 9 9 
                    . 9 9 9 f 9 9 . 
                    . . 9 9 9 9 . .
        """),
        SpriteKind.Powerup1)
game.on_update_interval(5000, on_update_interval2)

def on_update_interval3():
    global counter, boss1, boss_health_bar, missile
    if counter >= 10:
        counter = 0
        boss1 = sprites.create(img("""
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
            """),
            SpriteKind.Boss)
        boss_health_bar = statusbars.create(20, 4, StatusBarKind.enemy_health)
        boss_health_bar.max = 100
        boss_health_bar.value = 100
        boss_health_bar.set_label("BOSS:", 2)
        boss_health_bar.set_position(75, 5)
        for index2 in range(15):
            boss1.set_position(randint(0, 160), 15)
            missile = sprites.create(img("""
                    b 5 5 b 
                                    b 5 5 b 
                                    b 2 2 b 
                                    b b b b
                """),
                SpriteKind.asteroid)
            boss1.set_position(randint(0, 160), 0)
            missile.set_velocity(0, 50)
            animation.run_image_animation(missile,
                [img("""
                        c c 4 4 4 4 c c 
                                        c c 4 4 4 4 c c 
                                        c c 4 4 4 4 c c 
                                        c c 4 4 4 4 c c 
                                        c c 2 2 2 2 c c 
                                        c c 2 2 2 2 c c 
                                        c c c c c c c c 
                                        c c c c c c c c
                    """),
                    img("""
                        b b 5 5 5 5 b b 
                                        b b 5 5 5 5 b b 
                                        b b 5 5 5 5 b b 
                                        b b 5 5 5 5 b b 
                                        b b 2 2 2 2 b b 
                                        b b 2 2 2 2 b b 
                                        b b b b b b b b 
                                        b b b b b b b b
                    """)],
                100,
                True)
game.on_update_interval(500, on_update_interval3)

def on_update_interval4():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
            1 1 
                    1 1 
                    1 1 
                    1 1
        """),
        mySprite,
        0,
        -100)
game.on_update_interval(100, on_update_interval4)
