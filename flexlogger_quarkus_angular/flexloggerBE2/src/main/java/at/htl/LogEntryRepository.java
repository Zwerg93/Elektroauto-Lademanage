package at.htl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;
import java.util.*;
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

            }

            //stmt = conn.createStatement();

            //ResultSet rs = stmt.executeQuery(sql);


            //rs.close();
            //stmt.close();
            //conn.close();

        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntries;
    }

    public LogEntry getCurrentByName(String dpName) {
        String sql = "SELECT * FROM flexlogger where dp_name = ? limit 1";
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

            }

            //stmt = conn.createStatement();

            //ResultSet rs = stmt.executeQuery(sql);


            //rs.close();
            //stmt.close();
            //conn.close();

        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntry;
    }

    //********* CSV
    public void getCSVall(int timeLine, String filePath) throws IOException {
        Set<LogEntry> logEntrySet = getAll(timeLine);
        Stream<String> stringSet = logEntrySet.stream().map(logEntry -> logEntry.toString());
        writeToCsvFile(stringSet, new File(filePath));
    }

    public void getCSVbyName(int timeLine, String filePath, String name) throws IOException {
        Set<LogEntry> logEntrySet = getByName(timeLine, name);
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

    public Set<LogEntry> getCSVbyName(int timeLine) {
        getAll(timeLine);

        return null;
    }



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

    public Set<LogEntry> getByName(int timeLine, String dpName) {
        Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));
        String sql = "SELECT * FROM flexlogger WHERE dp_name = ? AND timestamp > ?";
        long timestamp = System.currentTimeMillis() - timeLine;

        try (Connection conn = connect()) {

            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setString(1, dpName);
                ps.setLong(2, timestamp);
                //ps.executeUpdate();
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    logEntries.add(new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp")));
                }

            }

            //stmt = conn.createStatement();

            //ResultSet rs = stmt.executeQuery(sql);


            //rs.close();
            //stmt.close();
            //conn.close();

        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntries;
    }
}
