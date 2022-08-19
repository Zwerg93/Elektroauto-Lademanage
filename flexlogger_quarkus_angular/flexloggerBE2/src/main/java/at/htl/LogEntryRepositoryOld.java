package at.htl;

import java.sql.*;
import java.util.*;

public class LogEntryRepositoryOld {
    private Set<LogEntry> logEntries = Collections.newSetFromMap(Collections.synchronizedMap(new LinkedHashMap<>()));

    public Set<LogEntry> getAll() {
        String query = "Select * from logtable limit 10";
        String query2 = "";


        Connection conn = null;
        try {
            // db parameters
            String url = "jdbc:sqlite:D:/Teresa/Diplomarbeit/db/log.db";
            // create a connection to the database
            conn = DriverManager.getConnection(url);
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(query);
            System.out.println("Connection to SQLite has been established.");

            while (rs.next()) {
                logEntries.add(new LogEntry(rs.getString("dp_name"), rs.getString("value"), rs.getString("unit"), rs.getLong("timestamp")));

            }


            } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }

        return logEntries;

    }


}
