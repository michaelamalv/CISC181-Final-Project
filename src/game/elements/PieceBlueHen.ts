/* HW10 Problem 3

In the constructor, add "move", "attack" and "spawn"
to the allowable actions array.

Implement the updateAction method with the following
logic:
-  if the action is "attack", then call increaseNumAttacks
*/

import { Location } from "./Location";
import { Piece } from "./Piece";

export class PieceBlueHen extends Piece {
    public static readonly MAX_NUM_ATTACKS: number = 3;
    private flies: boolean = true;
    private numAttacks: number;

    constructor(
        symbol: string = "H",
        teamColor: string = "NON",
        hidden: boolean = false,
        original: boolean = true,
        numAttacks: number = 0,
    ) {
        super(symbol, teamColor, hidden, original);
        this.numAttacks = numAttacks;
        this.allowableActions = ["move", "attack", "spawn"];
        this.updateFly();
    }

    getNumAttacks(): number {
        return this.numAttacks;
    }

    increaseNumAttacks(): void {
        this.numAttacks += 1;
        this.updateFly();
    }

    private updateFly(): void {
        if (this.numAttacks >= 3) {
            this.flies = false;
        }
    }

    speak(): string {
        return "Go UD!";
    }

    spawn(): PieceBlueHen {
        this.numSpawns += 1;
        return new PieceBlueHen(
            this.symbol.toLowerCase(),
            this.teamColor,
            this.hidden,
            false,
            0,
        );
    }

    validMovePath(moveFrom: Location, moveTo: Location): boolean {
        const rowDiff: number = moveFrom.getRow() - moveTo.getRow();
        const colDiff: number = moveFrom.getCol() - moveTo.getCol();

        let canMove: boolean = true;
        if (!this.flies) {
            canMove =
                ((rowDiff === 1 || rowDiff === -1) && colDiff === 0) ||
                (rowDiff === 0 && (colDiff === 1 || colDiff === -1));
        }
        return canMove;
    }

    canSpawn(): boolean {
        return this.original && this.numSpawns === 0;
    }

    updateAction(action: string): void {
        if (action === "attack") {
            this.increaseNumAttacks();
            this.updateFly();
        }
    }

    getImageName(): string {
        return `bluehen_${this.teamColor.toLowerCase()}.png`;
    }

    getType(): string {
        return "Blue Hen";
    }
}
