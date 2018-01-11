package com.vas.casalimpa.java;


import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * Todos os direitos reservados
 */

/**
 *
 * @author Vinicius
 */
public class CustomDateDeserialize extends JsonDeserializer<Date> {
    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

    @Override
    public Date deserialize(JsonParser jp, DeserializationContext dc) throws IOException, JsonProcessingException {
        String str = jp.getText().trim();
        try {
            return simpleDateFormat.parse(str);
        } catch (ParseException pe) {
            
        }
        return dc.parseDate(str);
    }
    
}
