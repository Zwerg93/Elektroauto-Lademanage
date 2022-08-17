package at.htl;

public class LogTable {
    String dpId;
    String value;
    String unit;
    Long timeStamp;

    public LogTable(String dpId, String value, String unit, Long timeStamp) {
        this.dpId = dpId;
        this.value = value;
        this.unit = unit;
        this.timeStamp = timeStamp;
    }


}
