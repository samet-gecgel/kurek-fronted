export enum Status {
  WAITING = "WAITING",      // Bekliyor
  ATTENDED = "ATTENDED",    // Katıldı
  ABSENT = "ABSENT",        // Katılmadı
  EXCUSED = "EXCUSED"       // Raporlu
}

export enum LessonStatus {
  SCHEDULED = "SCHEDULED",    // Planlandı
  IN_PROGRESS = "IN_PROGRESS", // Devam ediyor
  COMPLETED = "COMPLETED",    // Tamamlandı
  CANCELED = "CANCELED"       // İptal edildi
}

export enum BoatClass {
  SINGLE_FOLLOW = "1X_BOT_TAKIP",    // Tek kişilik takip
  DOUBLE_FOLLOW = "2X_BOT_TAKIP",    // İki kişilik takip
  DOUBLE_PRIVATE = "2X_OZEL_DERS",   // İki kişilik özel ders
  QUAD_COXED = "4X_DUMEN"           // Dört kişilik dümenci
}

export enum LessonLevel {
  BEGINNER = "BEGINNER",        // Başlangıç
  INTERMEDIATE = "INTERMEDIATE", // Orta Seviye
  ADVANCED = "ADVANCED"         // İleri Seviye
}