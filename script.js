// Fungsionalitas Modal untuk Hobi & Pengalaman (Hanya di about.html)
if (document.getElementById('modal')) {
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const gridItems = document.querySelectorAll('.hobby-experience-grid .grid-item');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalImage = document.getElementById('modal-image'); // Tambahkan elemen gambar di modal jika diperlukan

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            modalTitle.textContent = item.dataset.title;
            modalDescription.textContent = item.dataset.description;

            // BARU: Cek jika ada data-image, lalu tampilkan gambarnya
            if (item.dataset.image) {
                modalImage.src = item.dataset.image;
                modalImage.style.display = 'block'; // Tampilkan elemen gambar
            } else {
                modalImage.style.display = 'none'; // Sembunyikan jika tidak ada path gambar
            }

            modal.style.display = 'flex'; // Mengubah display ke flex agar bisa center
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
}


// Mengatur menu navigasi aktif berdasarkan URL
const currentPage = window.location.pathname.split('/').pop(); // Mendapatkan nama file HTML saat ini

// Jika currentPage kosong (misal: hanya domain.com/), anggap itu index.html
const activePage = currentPage === '' ? 'index.html' : currentPage;

document.querySelectorAll('header nav a').forEach(link => {
    link.classList.remove('active'); // Hapus semua kelas aktif terlebih dahulu
    const linkHref = link.getAttribute('href');
    if (linkHref === activePage) {
        link.classList.add('active');
    }
});

window.addEventListener('DOMContentLoaded', (event) => {
    const audio = document.getElementById('background-music');

    // Fungsi untuk memulai musik
    function startMusic() {
        // Cek apakah audio sudah siap untuk diputar
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay berhasil, hapus listener agar tidak berjalan lagi
                document.body.removeEventListener('click', startMusic);
            })
            .catch(error => {
                // Autoplay diblokir oleh browser.
                // Musik akan dimulai saat pengguna mengklik di mana saja.
                console.log("Autoplay was prevented. Waiting for user interaction.");
            });
        }
    }

    // Memuat posisi musik terakhir dari session storage
    const lastTime = sessionStorage.getItem('musicTime');
    if (lastTime) {
        audio.currentTime = parseFloat(lastTime);
    }
    
    // Coba putar musik saat halaman dimuat
    startMusic();

    // Jika autoplay gagal, tambahkan event listener untuk klik pertama
    document.body.addEventListener('click', startMusic, { once: true });

    // Menyimpan posisi musik saat ini sebelum halaman ditutup/pindah
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('musicTime', audio.currentTime);
    });
});