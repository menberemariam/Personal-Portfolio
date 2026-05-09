# 📥 CV Download Setup Instructions

## Quick Setup (3 Steps)

### Step 1: Save Your CV
Save your CV PDF file as **`Menberemariyam-CV.pdf`** in the `assets/` folder.

```
portfolio/
├── assets/
│   └── Menberemariyam-CV.pdf  ← Put your CV here
├── css/
├── js/
└── index.html
```

### Step 2: Test the Download
1. Open `index.html` in your browser
2. Click the **"📥 Download CV"** button in the navigation bar
3. Your CV should download automatically
4. A notification will appear: "CV Download Started!"

### Step 3: Done! ✅
Your CV is now downloadable from your portfolio!

---

## 🎨 What Was Added

### 1. Download Button in Navigation
- Located in the top navigation bar
- Styled with gradient background
- Icon: 📥 Download CV
- Responsive on all devices

### 2. Download Functionality
- Automatic download when clicked
- File saves as: `Menberemariyam_Teshome_CV.pdf`
- Success notification appears
- Works on all modern browsers

### 3. Notification System
- Animated slide-in notification
- Auto-dismisses after 3 seconds
- Confirms successful download

---

## 📋 CV Content Checklist

Make sure your CV includes:

✅ **Personal Information**
- Full Name: Menberemariyam Teshome
- Email: menberemariam123@gmail.com
- Phone: +251 991 541 981
- Location: Addis Ababa, Ethiopia
- LinkedIn & GitHub links

✅ **Profile Summary**
- Full-Stack Software Engineer
- Specializations (Web, Mobile, Desktop)

✅ **Technical Skills**
- Programming Languages
- Frameworks & Libraries
- Development Tools
- Databases

✅ **Education**
- Arsi University
- Bachelor of Computer Science
- Sep 2024 - Jun 2027

✅ **Projects**
- ARU HR Management System
- SkyBook Flight App
- SafeWalk
- Personal Finance App
- Libra-Scrape

✅ **Internships**
- UnlockedGen Mentorship

✅ **Certificates**
- 5M coders Initiative
- Eshe
- ETCPC

✅ **Achievements**
- Real-world projects
- Academic performance
- Team collaboration

---

## 🔧 Customization Options

### Change the CV Filename
Edit `js/utils.js` (line ~25):
```javascript
link.href = 'assets/YOUR-FILENAME.pdf';
link.download = 'YOUR-DOWNLOAD-NAME.pdf';
```

### Change Button Text
Edit `index.html` (navigation section):
```html
<a href="#" class="cv-download" id="downloadCV">
  <i class="fas fa-download"></i> Your Text Here
</a>
```

### Change Button Style
Edit `css/navigation.css` (`.cv-download` class):
```css
.cv-download {
  background: your-color;
  /* Add your custom styles */
}
```

---

## 🌐 Alternative: Host CV Externally

If you prefer to host your CV on Google Drive or Dropbox:

### Google Drive:
1. Upload CV to Google Drive
2. Right-click → Get link → Set to "Anyone with the link"
3. Copy the file ID from the URL
4. Use this format:
   ```
   https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
   ```

### Dropbox:
1. Upload CV to Dropbox
2. Get shareable link
3. Change `?dl=0` to `?dl=1` at the end
4. Use that link in `js/utils.js`

---

## 🐛 Troubleshooting

### Download Not Working?

**Check 1: File Location**
```
✅ Correct: assets/Menberemariyam-CV.pdf
❌ Wrong: Menberemariyam-CV.pdf (in root)
❌ Wrong: assets/cv.pdf (wrong name)
```

**Check 2: Browser Console**
1. Press F12
2. Click Console tab
3. Look for errors
4. Common error: "404 Not Found" = file not in correct location

**Check 3: File Permissions**
- Make sure the PDF file is readable
- Check file isn't corrupted

**Check 4: Browser Settings**
- Some browsers block automatic downloads
- Check browser download settings
- Try a different browser

### Notification Not Showing?

- Clear browser cache (Ctrl + Shift + R)
- Check if JavaScript is enabled
- Look for console errors

---

## 📱 Mobile Responsiveness

The CV download button is fully responsive:

- **Desktop:** Appears in navigation bar
- **Tablet:** Appears in navigation bar
- **Mobile:** Appears in mobile menu

---

## ✨ Features

✅ One-click download  
✅ Automatic file naming  
✅ Success notification  
✅ Smooth animations  
✅ Mobile responsive  
✅ Cross-browser compatible  
✅ No external dependencies  

---

## 📞 Need Help?

If you encounter any issues:

1. Check `assets/README.md` for detailed instructions
2. Review `js/utils.js` for the download code
3. Check browser console for errors
4. Email: menberemariam123@gmail.com

---

**Last Updated:** May 2026  
**Status:** ✅ Ready to Use
