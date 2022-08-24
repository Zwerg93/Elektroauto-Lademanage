package at.htl;

import io.quarkus.logging.Log;
import io.smallrye.mutiny.Uni;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

import static io.vertx.core.http.impl.HttpClientConnection.log;

@Path("/logEntry")
public class LogEntryResource {
    LogEntryRepository elr = new LogEntryRepository();
    private Set<LogEntry> legumes = Collections.synchronizedSet(new LinkedHashSet<>());


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/all/{startDate}/{endDate}/{startTime}/{endTime}")
    public Set<LogEntry> getAll2(@PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("startTime") String startTime, @PathParam("endTime") String endTime) {
        return elr.getAll(startDate, endDate, startTime, endTime);
    }

    @GET
    @Path("/name/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Set<LogEntry> getByName(@PathParam("name") String name) {
        return elr.getByName("2022-08-23", "2022-08-23", "13:41", "13:43", "REAL173");
    }

    @GET
    @Path("/currentName/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public LogEntry getCurrentName(@PathParam("name") String name) {
        return elr.getCurrentByName(name);
    }

    @GET
    @Path("/csv/{startDate}/{endDate}/{startTime}/{endTime}/{filepath : .*}")
    public void getCSV(@PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("startTime") String startTime, @PathParam("endTime") String endTime, @PathParam("filepath") String filepath) throws IOException {
        elr.getCSVall(startDate, endDate, startTime, endTime, filepath);
    }

    @GET
    @Path("/csv/{startDate}/{endDate}/{startTime}/{endTime}/{filepath : .*}/{name}")
    public void getCSVByName(@PathParam("startDate") String startDate, @PathParam("endDate") String endDate, @PathParam("startTime") String startTime, @PathParam("endTime") String endTime, @PathParam("filepath") String filepath, @PathParam("name") String name) throws IOException {
        elr.getCSVbyName(startDate, endDate, startTime, endTime, filepath, name);
    }


    @GET
    @Path("/insert")
    public void insert() {
        System.out.println(elr.insertLogEntry(new LogEntry("Kompressor_kk", "454", "A", 1660870822)));
    }

    @GET
    @Path("/download")
    @Produces({"text/csv"})
    public Response downloadFile() {
        String fileName = "monitor.csv";
        String path = "/home/marcel/Desktop" + fileName;
        File audioFile = new File(path);
        if (!audioFile.exists()) {
            throw new RuntimeException("File not found: " +  fileName);
        }
        Response.ResponseBuilder res = Response.ok((Object) audioFile);
        res.header("Content-Disposition", "inline;filename=" + fileName);
        return res.build();
    }


}
