package at.htl;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

@Path("/logEntry")
public class LogEntryResource {
    LogEntryRepository elr = new LogEntryRepository();
    private Set<LogEntry> legumes = Collections.synchronizedSet(new LinkedHashSet<>());


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Set<LogEntry> getAll() {
        return elr.getAll();
    }

    @GET
    @Path("/csv")
    public void getCSV() {
        elr.getCSV();
    }

    @GET
    @Path("/insert")
    public void insert() {
        System.out.println(elr.insertLogEntry(new LogEntry("Kompressor_kk", "454","A", 1660870822)));
    }


}
