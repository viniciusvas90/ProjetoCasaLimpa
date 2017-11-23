/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vas.casalimpa.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 *
 * @author Vinicius
 */
public class UtilVas {

    public static String encrypt(String str) {
        StringBuilder sb = new StringBuilder();
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] messageDigest = md.digest(str.getBytes("UTF-8"));
            sb = new StringBuilder();

            for (byte b : messageDigest) {
                sb.append(String.format("%02X", 0xFF & b));
            }
        } catch (NoSuchAlgorithmException ex) {
            //TODO
        } catch (UnsupportedEncodingException ex) {
            //TODO
        }
        return sb.toString();
    }
}
