export class Square {
    available = true;
    id = Math.random();
    selectedBy: string | null;

    constructor(selectedBy: string | null) {
        this.selectedBy = selectedBy;
    }

    public markSquare(chosenBy: string) {
        this.available = false;
        this.selectedBy = chosenBy;
    }
}