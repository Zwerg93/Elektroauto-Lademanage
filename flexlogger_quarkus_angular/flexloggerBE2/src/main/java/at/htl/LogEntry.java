package at.htl;


public class LogEntry {
    String dpId;
    String value;
    String unit;
    long timeStamp;

    public LogEntry(String dpId, String value, String unit, long timeStamp) {
        this.dpId = dpId;
        this.value = value;
        this.unit = unit;
        this.timeStamp = timeStamp;
    }

    public String getDpId() {
        return dpId;
    }

    public void setDpId(String dpId) {
        this.dpId = dpId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }
}
