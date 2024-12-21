export const scheduleEventNotification = (eventId: string, eventDate: Date) => {
  // 1 gün önce
  const oneDayBefore = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
  
  // 1 saat önce
  const oneHourBefore = new Date(eventDate.getTime() - 60 * 60 * 1000);

  // Bildirimleri zamanla
  setTimeout(() => {
    sendNotification("Etkinlik Hatırlatıcısı", "Katıldığınız etkinlik yarın başlayacak, hazır mısınız?");
  }, oneDayBefore.getTime() - Date.now());

  setTimeout(() => {
    sendNotification("Etkinlik Hatırlatıcısı", "Katıldığınız etkinlik 1 saat sonra başlayacak!");
  }, oneHourBefore.getTime() - Date.now());
};

const sendNotification = (title: string, message: string) => {
  // Web Push Notification veya başka bir bildirim sistemi entegrasyonu
  if (Notification.permission === "granted") {
    new Notification(title, { body: message });
  }
}; 