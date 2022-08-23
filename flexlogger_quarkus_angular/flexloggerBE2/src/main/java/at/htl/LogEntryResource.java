package at.htl;

import io.quarkus.logging.Log;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

@Path("/logEntry")
public class LogEntryResource {
    LogEntryRepository elr = new LogEntryRepository();
    private Set<LogEntry> legumes = Collections.synchronizedSet(new LinkedHashSet<>());


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Set<LogEntry> getAll2() {
        return elr.getAll("2022-08-23", "2022-08-23", "13:41", "13:56");
    }

    @GET
    @Path("/name/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Set<LogEntry> getByName(@PathParam("name") String name) {
        return elr.getByName(3600000, name);
    }

    @GET
    @Path("/currentName")
    @Produces(MediaType.APPLICATION_JSON)
    public LogEntry getCurrentName(String name) {
        return elr.getCurrentByName(name);
    }

    @GET
    @Path("/csv/{startDate}/{endDate}/{startTime}/{endTime}/{filepath : .*}")
    public void getCSV(@PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("startTime") String startTime, @PathParam("endTime") String endTime, @PathParam("filepath") String filepath) throws IOException {
        elr.getCSVall(startDate, endDate, startTime, endTime, filepath);
    }

    @GET
    @Path("/csv/name")
    public void getCSVByName() throws IOException {
        elr.getCSVbyName(3600000, "c:\\angular1\\monitorName.csv", "REAL1");
    }


    @GET
    @Path("/insert")
    public void insert() {
        System.out.println(elr.insertLogEntry(new LogEntry("Kompressor_kk", "454", "A", 1660870822)));
    }


}
