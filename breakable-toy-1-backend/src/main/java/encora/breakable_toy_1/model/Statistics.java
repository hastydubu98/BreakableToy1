package encora.breakable_toy_1.model;

public class Statistics {

    private double totalStocks;
    private double totalValue;
    private double average;

    public Statistics(double totalStocks, double totalValue, double average) {
        this.totalStocks = totalStocks;
        this.totalValue = totalValue;
        this.average = average;
    }

    public double getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(double totalValue) {
        this.totalValue = totalValue;
    }

    public double getTotalStocks() {
        return totalStocks;
    }

    public void setTotalStocks(double totalStocks) {
        this.totalStocks = totalStocks;
    }

    public double getAverage() {
        return average;
    }

    public void setAverage(double average) {
        this.average = Math.round(average * 100.0) / 100.0;
    }
}
