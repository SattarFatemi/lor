class CooperationRing {
    constructor(investorId, coins, numberOfRequiredRounds) {
        this.investorId = investorId;
        this.memberCount = coins.length;
        this.numberOfRequiredRounds = numberOfRequiredRounds;
        this.weight = coins.reduce((accumulator, coin) => accumulator + coin.price, 0);
    }

    toDB() {
        return {
            investorId: this.investorId,
            memberCount: this.memberCount,
            numberOfRequiredRounds: this.numberOfRequiredRounds,
            weight: this.weight,
            nextInFractalRing: this.nextInFractalRing,
            prevInFractalRing: this.prevInfractalRing,
        }
    }
}

module.exports = CooperationRing;
