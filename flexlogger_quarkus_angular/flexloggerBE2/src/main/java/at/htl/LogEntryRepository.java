package at.htl;

import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Date;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LogEntryRepository {

    private final String url = "jdbc:postgresql://developer.pi-tec.at:5432/Datamanager_SMA";
    private final String user = "postgres";
    private final String password = "NasAmuX73";
    Statement stmt = null;


    /**
     * Connect to the PostgreSQL database
     *
     * @return a Connection object
     */
    public Connection connect() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    /*
    public Set<LogEntry> getAll(int timeLine) {
        Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));
        long timestamp = System.currentTimeMillis() - timeLine;
        System.out.println(timestamp);
        String sql = "SELECT * FROM flexlogger where timestamp > ?";

        try (Connection conn = connect()) {
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, timestamp);
                //ps.executeUpdate();
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    System.out.println(rs.getString("dp_name"));
                    logEntries.add(new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp")));
                }
                //rs.close();
            }
            //stmt.close();
        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntries;
    }
    */


    public Set<LogEntry> getAll(String dateStart, String timeStart, String dateEnd, String timeEnd) {
        Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));

        long startMillis = convertToMillis(dateStart, timeStart);
        long endMillis = convertToMillis(dateEnd, timeEnd);

        String sql = "SELECT * FROM flexlogger where timestamp > ? AND timestamp < ? order by timestamp";

        try (Connection conn = connect()) {
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setLong(1, startMillis);
                ps.setLong(2, endMillis);
                //ps.executeUpdate();
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    //System.out.println(rs.getString("dp_name"));
                    logEntries.add(new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp")));
                }
                //rs.close();
            }
            //stmt.close();
        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntries;
    }

    public long convertToMillis(String date, String time) {
        String startDateTime = date + " " + time;
        LocalDateTime localStartDateTime = LocalDateTime.parse(startDateTime,
                DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        return localStartDateTime
                .atZone(ZoneId.systemDefault())
                .toInstant().toEpochMilli();
    }

    public LogEntry getCurrentByName(String dpName) {
        String sql = "SELECT * FROM flexlogger where dp_name = ? order by timestamp desc limit 10";
        LogEntry logEntry = null;

        try (Connection conn = connect()) {
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, dpName);
                //ps.executeUpdate();
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    System.out.println(rs.getString("dp_name"));
                    logEntry = new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp"));
                }
                //rs.close();

            }
            //stmt.close();
        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntry;
    }

    //********* CSV
    public void getCSVall(String startDate, String endDate, String startTime, String endTime, String filePath) throws IOException {
        Set<LogEntry> logEntrySet = getAll(startDate, endDate, startTime, endTime);
        Stream<String> stringSet = logEntrySet.stream().map(logEntry -> logEntry.toString());
        writeToCsvFile(stringSet, new File(filePath));
    }

    public void getCSVbyName(String startDate, String endDate, String startTime, String endTime, String filePath, String name) throws IOException {
        Set<LogEntry> logEntrySet = getByName(startDate, endDate, startTime, endTime, name);
        Stream<String> stringSet = logEntrySet.stream().map(logEntry -> logEntry.toString());
        writeToCsvFile(stringSet, new File(filePath));
    }



    private void writeToCsvFile(Stream<String> logEntrySet, File file) throws IOException {
        List<String> collect = logEntrySet
                .map(this::convertToCsvFormat)
                .collect(Collectors.toList());

        // CSV is a normal text file, need a writer
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(file))) {
            for (String line : collect) {
                bw.write(line);
                bw.newLine();
            }
        }


    }

    public String convertToCsvFormat(final String line) {
        return Stream.of(line)                              // convert String[] to stream
                .collect(Collectors.joining(";"));
    }


    //********* CSV


    public long insertLogEntry(LogEntry logEntry) {
        String SQL = "INSERT INTO flexlogger(dp_name, value, unit, timestamp) "
                + "VALUES(?,?,?,?)";

        long id = 0;

        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(SQL,
                     Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, logEntry.dpId);
            pstmt.setString(2, logEntry.value);
            pstmt.setString(3, logEntry.unit);
            pstmt.setLong(4, logEntry.timeStamp);

            pstmt.executeUpdate();

        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return id;
    }

    public Set<LogEntry> getByName(String dateStart, String dateEnd, String timeStart, String timeEnd, String dpName) {
        Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));

        long startMillis = convertToMillis(dateStart, timeStart);
        long endMillis = convertToMillis(dateEnd, timeEnd);

        String sql = "SELECT * FROM flexlogger WHERE dp_name = ? AND timestamp > ? AND timestamp < ? order by timestamp";


        try (Connection conn = connect()) {

            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, dpName);
                ps.setLong(2, startMillis);
                ps.setLong(3, endMillis);
                //ps.executeUpdate();
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    System.out.println(rs.getString("dp_name"));
                    logEntries.add(new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp")));
                }
                //rs.close();
            }
            //stmt.close();
        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntries;
    }
}
