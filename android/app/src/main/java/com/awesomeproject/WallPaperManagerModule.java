package com.awesomeproject;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class WallPaperManagerModule extends ReactContextBaseJavaModule {

    public WallPaperManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WallPaperManager";
    }

    @ReactMethod
    public void setWallpaper(String imageUrl, String type, Callback callback) {
        AsyncTask.execute(() -> {
            try {
                // Download the image
                URL url = new URL(imageUrl);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.connect();
                InputStream input = connection.getInputStream();
                Bitmap bitmap = BitmapFactory.decodeStream(input);

                // Set the wallpaper based on type
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
                if (type.equals("home")) {
                    wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_SYSTEM);
                } else if (type.equals("lock")) {
                    wallpaperManager.setBitmap(bitmap, null, true, WallpaperManager.FLAG_LOCK);
                }

                // Call the callback with success
                callback.invoke(null, "Wallpaper set successfully on " + type + " screen!");
            } catch (Exception e) {
                // Call the callback with an error
                callback.invoke(e.getMessage(), null);
            }
        });
    }
}
