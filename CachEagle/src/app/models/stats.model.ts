export class Stats {

    constructor(id: number) {
        this.startTime = new Date()
        this.endTime = null
        this.hint = false
        this.distance = 0.0
        this.cacheId = id
    }

    startTime!: Date | null
    endTime!: Date | null
    distance!: number
    hint!: boolean
    cacheId!: number
}
