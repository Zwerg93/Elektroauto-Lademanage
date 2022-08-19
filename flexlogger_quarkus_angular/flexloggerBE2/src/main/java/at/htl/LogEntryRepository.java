package at.htl;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.sql.*;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Set;

public class LogEntryRepository {

    private final String url = "jdbc:postgresql://developer.pi-tec.at:5432/Datamanager_SMA";
    private final String user = "postgres";
    private final String password = "NasAmuX73";
    Statement stmt = null;
    private Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));;

    String dpName;
    /**
     * Connect to the PostgreSQL database
     *
     * @return a Connection object
     */
    public Connection connect() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    public Set<LogEntry> getAll() {
        String sql = "SELECT * FROM flexlogger";

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


    public long insertActor(LogEntry logEntry) {
        String SQL = "INSERT INTO flexlogger(dp_name, value, unit, timestamp) "
                + "VALUES(?,?,?,?)";

        long id = 0;

        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(SQL,
                     Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, logEntry.dpId);
            pstmt.setString(2, logEntry.value);
            pstmt.setString(1, logEntry.dpId);
            pstmt.setString(2, logEntry.value);

            int affectedRows = pstmt.executeUpdate();
            // check the affected rows
            if (affectedRows > 0) {
                // get the ID back
                try (ResultSet rs = pstmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        id = rs.getLong(1);
                    }
                } catch (SQLException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
        return id;
    }

}
