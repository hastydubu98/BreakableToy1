package encora.breakable_toy_1.model;

public class Statistics {

    private double totalValue;
    private double totalStocks;
    private double average;

    public Statistics(double totalValue, double totalStocks, double average) {
        this.totalValue = totalValue;
        this.totalStocks = totalStocks;
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
        this.average = average;
    }
}
