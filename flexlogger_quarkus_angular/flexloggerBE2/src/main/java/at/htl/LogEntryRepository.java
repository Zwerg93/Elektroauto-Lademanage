package at.htl;

import java.sql.*;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Set;

public class LogEntryRepository {

    private final String url = "jdbc:postgresql://developer.pi-tec.at:5432/Datamanager_SMA";
    private final String user = "postgres";
    private final String password = "NasAmuX73";
    Statement stmt = null;
    private Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));
    ;

    String dpName;

    /**
     * Connect to the PostgreSQL database
     *
     * @return a Connection object
     */
    public Connection connect() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    public Set<LogEntry> getAll(int timeLine) {
        long timestamp = System.currentTimeMillis() -timeLine;
        System.out.println(timestamp);
        String sql = "SELECT * FROM flexlogger where timestamp > ?";


        try (Connection conn = connect()) {

            try(PreparedStatement ps = conn.prepareStatement(sql)) {
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

    public Set<LogEntry> getCSV() {
        String sql = "COPY flexlogger TO '\\C:\\Users\\holzd:logtabledb.csv'  WITH DELIMITER ',' CSV HEADER;";

        try (Connection conn = connect()) {
            stmt = conn.createStatement();

            ResultSet rs = stmt.executeQuery(sql);

            rs.close();
            stmt.close();
            conn.close();

        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }


        System.out.println(" CSV exported successfully ...");
        return logEntries;
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

    public Set<LogEntry> getByName(String dpName) {
        /*String sql = "SELECT * FROM flexlogger WHERE dm_name = :dpName";

        try (Connection conn = connect()) {
            stmt = conn.createStatement();

            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                logEntries.add(new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp")));
            }

            rs.close();
            stmt.close();
            conn.close();

        } catch (Exception e) {

            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);

        }
        System.out.println(" Data Retrieved Successfully ..");
        return logEntries;*/
        return null;
    }
}
