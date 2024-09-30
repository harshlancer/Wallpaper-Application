package com.awesomeproject;

import android.app.WallpaperManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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
    public void setWallpaper(String imageUrl, Callback callback) {
        AsyncTask.execute(() -> {
            try {
                // Download the image
                URL url = new URL(imageUrl);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.connect();
                InputStream input = connection.getInputStream();
                Bitmap bitmap = BitmapFactory.decodeStream(input);

                // Set the wallpaper
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(getReactApplicationContext());
                wallpaperManager.setBitmap(bitmap);

                // Call the callback with success
                callback.invoke(null, "Wallpaper set successfully!");
            } catch (Exception e) {
                // Call the callback with an error
                callback.invoke(e.getMessage(), null);
            }
        });
    }
}
