export const getInitials = (fullName: string) => {
    const names = fullName.split(' ');
    if (names.length > 2) {
      // İlk ismin ve son ismin baş harflerini al
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    // 2 veya daha az kelime varsa tüm baş harfleri al
    return names.map(name => name[0]).join('').toUpperCase();
  };