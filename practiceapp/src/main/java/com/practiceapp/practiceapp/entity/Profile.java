package com.practiceapp.practiceapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "profiles")
public class Profile {

    @Id
    @Field
    private ObjectId id;

    @Field
    private String name;

    @Field
    private String description;

    @Field
    private boolean isPublic = true;

    @Field
    private String photo;

    @Field
    private boolean isPhotoPublic = true;

    /*
        Lombok getter/setter methodlarını sunuyor, biliyorum. Fakat bu methodlara isimleri yüzünden
        ihtiyacım var.
        updateprofile.html'de kullandığım thymeleaf formu bu naming convention'ı arıyor. Bunları
        bulamadığı takdirde kod patlıyor.

        -burak
     */
    public boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public boolean getIsPhotoPublic() {
        return isPhotoPublic;
    }

    public void setIsPhotoPublic(boolean photoPublic) {
        isPhotoPublic = photoPublic;
    }

}
