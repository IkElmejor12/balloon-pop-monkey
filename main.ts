// Shooting darts for Player 1 (B button) with cooldown
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(player1Cooldown)) {
        dart = sprites.createProjectileFromSprite(img`
            . . . 1 . . . 
            `, player1, 0, -100)
        dart.setKind(SpriteKind.Projectile)
        player1Cooldown = true
        // Set cooldown duration for Player 1
        pause(ATTACK_COOLDOWN)
        player1Cooldown = false
    }
})
// Jumping for Player 1 (A button)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player1.isHittingTile(CollisionDirection.Bottom)) {
        // Player 1 jumps up
        player1.vy = -150
    }
})
// Function to spawn regular balloons
function spawnBalloon () {
    balloon = sprites.create(img`
        . . . . . . . 
        . . 3 3 3 . . 
        . 3 3 3 3 3 . 
        . 3 3 3 3 3 . 
        . . 3 3 3 . . 
        . . . 1 . . . 
        . . . 1 . . . 
        `, SpriteKind.Food)
    balloon.setPosition(randint(10, 150), 0)
    balloon.vy = 30
    balloon.setKind(SpriteKind.Enemy)
}
// Function to spawn golden balloons
function spawnGoldenBalloon () {
    goldenBalloon = sprites.create(img`
        . . . . . . . 
        . . 9 9 9 . . 
        . 9 9 9 9 9 . 
        . 9 9 9 9 9 . 
        . . 9 9 9 . . 
        . . . 5 . . . 
        . . . 5 . . . 
        `, SpriteKind.Food)
    goldenBalloon.setPosition(randint(10, 150), 0)
    goldenBalloon.vy = 30
    goldenBalloon.setKind(SpriteKind.Enemy)
}
// Balloon popping logic
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (projectile, balloon) {
    projectile.destroy()
    balloon.destroy()
    if (balloon.image.equals(img`
        . . . . . . . 
        . . 9 9 9 . . 
        . 9 9 9 9 9 . 
        . 9 9 9 9 9 . 
        . . 9 9 9 . . 
        . . . 5 . . . 
        . . . 5 . . . 
        `)) {
        if (Math.abs(projectile.x - player1.x) < Math.abs(projectile.x - player2.x)) {
            // Golden Balloon gives 3 points
            info.changeScoreBy(3)
        } else {
            info.player2.changeScoreBy(3)
        }
    } else {
        // Regular Balloon
        if (Math.abs(projectile.x - player1.x) < Math.abs(projectile.x - player2.x)) {
            info.changeScoreBy(1)
        } else {
            info.player2.changeScoreBy(1)
        }
    }
})
/**
 * Monkey Balloon Pop - 2 Player Game
 */
/**
 * Cooldown tracker for Player 1's attack
 */
let goldenBalloon: Sprite = null
let balloon: Sprite = null
let dart: Sprite = null
let player1Cooldown = false
let player2: Sprite = null
let player1: Sprite = null
let ATTACK_COOLDOWN = 0
// Cooldown tracker for Player 2's attack
let player2Cooldown = false
// Constants
let GRAVITY = 300
let BALLOON_SPAWN_RATE = 2000
// Golden balloon spawns less frequently
let GOLDEN_BALLOON_SPAWN_RATE = 10000
// 1 min 30 sec
let GAME_DURATION = 90000
// 2 seconds cooldown for attacks
ATTACK_COOLDOWN = 2000
// Set jungle background
// Green background
scene.setBackgroundColor(13)
// Create floor
let floor = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    4 5 . 5 4 . . 5 2 4 . . 4 5 4 . 
    e 2 5 e 4 . . 5 4 5 . 5 4 2 5 . 
    e 4 4 e 2 . 4 2 e 2 . . 5 e 2 . 
    2 e . e . . . 4 e 4 . . . e . . 
    . e . e . . . . e . . . . e . . 
    e e e e e e e e e e e e e e e e 
    `, SpriteKind.Player)
floor.setPosition(80, 120)
floor.setFlag(SpriteFlag.BounceOnWall, true)
floor.setScale(10, 1);
// Create players
player1 = sprites.create(img`
    . . . . . . . f f f f f . . . . 
    . . . . . . f e e e e e f . . . 
    . . . . . f e e e d d d d f . . 
    . . . . f f e e d d f d d f . . 
    . . . f d d e e d d f d d d c . 
    . . . c d b e e d d d d e e d c 
    . . . c d b e e d d c d d d d c 
    . . . f c f e e d d d f f f f c 
    . . . . f e e e e f f f d b f . 
    . . . . f e e f f f e f d d f . 
    . f f . f f f e e e e f f f . . 
    . f e . f f e e e e f e e f . . 
    . f e f f f f f f f e e e f f . 
    . f e f f f b b f e e f d b f . 
    . f f f f b d d e e f f d d f . 
    . . f f f f f f f f f f f f f . 
    `, SpriteKind.Player)
player1.setPosition(40, 100)
controller.moveSprite(player1, 100, 0)
player1.ay = GRAVITY
player1.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
player2 = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . . f d d f d d e e f f . . . . 
    . c d d d f d d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . . . 
    c f f f f d d d e e f c f . . . 
    . f b d f f f e e e e f . . . . 
    . f d d f e f f f e e f . . . . 
    . . f f f e e e e f f f . f f . 
    . . f e e f e e e e f f . e f . 
    . f f e e e f f f f f f f e f . 
    . f b d f e e f b b f f f e f . 
    . f d d f f e e d d b f f f f . 
    . f f f f f f f f f f f f f . . 
    `, SpriteKind.Player)
player2.setPosition(120, 100)
controller.player2.moveSprite(player2, 100, 0)
player2.ay = GRAVITY
player2.setFlag(SpriteFlag.StayInScreen, true)
info.player2.setScore(0)
controller.player2.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!player2Cooldown) {
        let dart2 = sprites.createProjectileFromSprite(img`
            . . . 1 . . .
        `, player2, 0, -100);
        dart2.setKind(SpriteKind.Projectile);
        player2Cooldown = true;
        // Set cooldown duration for Player 2
        pause(ATTACK_COOLDOWN);
        player2Cooldown = false;
    }
});
controller.player2.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player2.isHittingTile(CollisionDirection.Bottom)) {
        player2.vy = -150; // Player 2 jumps up
    }
});
// Timer
info.startCountdown(GAME_DURATION / 1000)
game.onUpdate(function () {
    if (info.countdown() <= 0) {
        if (info.score() > info.player2.score()) {
            game.splash("Player 1 Wins!")
        } else if (info.player2.score() > info.score()) {
            game.splash("Player 2 Wins!")
        } else {
            game.splash("It's a tie!")
        }
        game.over(true)
    }
})
// Spawn balloons at regular intervals
game.onUpdateInterval(BALLOON_SPAWN_RATE, function () {
    spawnBalloon()
})
// Spawn golden balloons less frequently
game.onUpdateInterval(GOLDEN_BALLOON_SPAWN_RATE, function () {
    spawnGoldenBalloon()
})
