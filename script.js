const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const quitButton = document.getElementById("quitButton");
const playAgainButton = document.getElementById("playAgainButton");
const menuButton = document.getElementById("menuButton");

const typingInput = document.getElementById("typingInput");
const targetWord = document.getElementById("targetWord");
const bird = document.getElementById("bird");

const timeValue = document.getElementById("timeValue");
const scoreValue = document.getElementById("scoreValue");
const wpmValue = document.getElementById("wpmValue");
const livesValue = document.getElementById("livesValue");

let selectedMode = "easy";
let duration = 30;
let timeLeft = 30;
let score = 0;
let errors = 0;
let lives = 5;
let startedAt = 0;
let timer = null;
let currentWord = "";
let wordList = [];
let usedWords = [];
let gameActive = false;
let birdIsDying = false;
let birdTimeout = null;
let birdMotionTimeout = null;
let birdRiseAnimation = null;

const durations = {
  easy: 30,
  normal: 60,
  hard: 120
};

// Daftar kata. Bisa ditambah kapan saja.
const WORDS = {
  easy: `
    aku ada air api abu ibu ini itu iya apa
    ayo asa asi bau bau babi baca baca bada
    baik baku bala batu bayi beda bela beli
    biru bisa bola buku bulu bumi buru busa
    cabai caci cadu caka cakar cari catu cuci
    dada dada dadu dagu dahi dana dari daun
    desa dini diri doa dua duka dulu duta
    gaya gigi gula guru guna guna hari hati
    haus heboh hina hiu hobi ikan ikut ilmu
    iram izin jaga jala jari jauh jaya jeli
    jiwa juga juru kaca kaki kala kami kamu
    kain kaki kala kaku kali kami kamu kana
    kaya kaya kaya kiri kita kota kuku kuda
    laba lagu laju lama lampu laut lega lelah
    lima lupa maju maka malu mama mana masa
    mata mati meja mila mimpi mini muda muka
    nama nasi naik naik nalar nana nadi naga
    naik nasi nekat nilai niat noda nona nyala
    obat obor ombak otak padi pagi paha paku
    pala peta pipa pita rabu raga raja rasa
    rata ratu raya reda rela roda roti rusa
    sabar satu sapi saku sama sana sari satu
    saya sewa sisi sofa susu tali tahu tari
    tata tebu tepi tiga toko topi tua tuan
    ubah uban ular ulas umat umur ungu unik
    usai usia utuh wadah wajah wajar wali
    warna waras warni wasit waktu wira
  `,
  normal: `
    abang acara acuan adonan alamat amanah ambang
    amarah angin angka angkut anjing anjuran antara
    aturan atasan awalan badan bagasi bahagia
    bahasa bahaya bakwan balapan balasan bangku
    banyak barang barisan batang batik bantuan
    bayang belajar belanja belukar bentuk berani
    beranda berasap berkas berlari bersih bertemu
    besaran beserta bintang bingkai bioskop bisikan
    budaya bulanan burung cabang cahaya cakrawala
    campuran canggih catatan cedera celana cerdas
    cerita cermin ceruk contoh cukup dahulu dalam
    dampak danau dapur daerah debu dekat dengan
    delapan desain detik dibaca dicari diduga
    dijaga dikirim dimulai diminta dinilai disiplin
    dongeng duduk dukung ekonomi edukasi efektif
    energi enggan enzim fasilitas faktor falsafah
    gambar gembira gerakan gelombang gelora
    gemuruh generasi geografi gerbang halaman
    hampir harapan harmoni hasil hebat hewan
    hiburan hidangan hijau himpunan hitungan
    identik ikatan ikhlas iklim imajinasi imbang
    industri informasi ingatan internet istana
    jadwal jaringan jendela jenjang jelajah jemari
    jernih jujur jumlah jurusan kabar kabinet
    kabut kacang kadang kalender kualitas kamar
    kampung kantor karena kereta kesan ketik
    keuangan keluarga kegiatan kelinci kemajuan
    kembali kemasan kendali kepala keranjang
    kertas kerupuk kesatuan kesehatan ketenangan
    kilatan kilometer komando komputer kondisi
    koneksi konsisten konten kontrol koreksi
    kosakata kualitas kuliner kumpulan kuningan
    langkah layanan latihan lembaga lembar
    lengkap lentera lingkungan lintasan lukisan
    makanan makhluk manusia manfaat mangga
    menarik matahari materi mekar melatih
    menulis merdeka mesin minggu minuman
    motivasi musiman nasihat nasional nelayan
    nyaman olahraga ombak operasi organisasi
    pakaian palang panduan panjang pantulan
    paragraf pasukan pelajaran peluang pembaca
    penciptaan pendapat pendidikan pengaturan
    perjalanan permainan peristiwa pertanian
    pesawat petunjuk pikiran pilihan piknik
    planet prasasti produksi program proyek
    puluhan pustaka rencana ruangan sabuk
    sahabat saluran sambungan sampah samudra
    santapan sekolah sederhana sejarah sejuk
    selamat semangat semesta senjata sentuhan
    seragam serangga seratus sesuatu setempat
    sinar sistem situasi sungai susunan taman
    tanaman teknologi teladan tekanan tembakan
    terbang terbuka teratur terima terbit
    terbesar terukur tersedia tertulis
    tindakan tingkah tingkatan tradisi
    tujuan tuntunan ukuran unggulan universitas
    usaha utama utusan wajah wacana wisata
  `,
  hard: `
    abjadiah administrasi aerodinamika akuntabilitas
    akuntansi akumulator aktualisasi alamiah
    algoritma alihteknologi analisis anjungan
    antarmuka antropologi arsitektur astronomi
    otomatisasi bermanfaat berkelanjutan berkomunikasi
    berpartisipasi bertanggungjawab biodiversitas
    cendekiawan kesinambungan keterampilan
    kewirausahaan kolaborasi komprehensif komunikasi
    komputerisasi konsekuensi konsentrasi konstruksi
    kreativitas laboratorium keberhasilan kebudayaan
    kecerdasan kedisiplinan keindahan keistimewaan
    kelestarian kemanusiaan kemerdekaan kemampuan
    kepemimpinan keragaman keseimbangan keselarasan
    keselamatan kesempurnaan ketelitian keterbukaan
    ketergantungan ketertarikan ketidakpastian
    lingkungan literasi manajemen manufaktur
    matematika memperhatikan memperkenalkan
    memperlihatkan memprioritaskan menyenangkan
    mengembangkan mengendalikan menginspirasi
    mengoperasikan mengoptimalkan mengorganisasi
    mengumpulkan menyelesaikan merencanakan
    menyampaikan merancang merawat merdeka
    metropolitan mikroskopis multikultural
    navigasi observatorium operasional organisasi
    pembangunan pembelajaran pemberdayaan
    pemerintahan pengetahuan pengembangan
    pengendalian pengelolaan pengalaman pengamatan
    pengoperasian perencanaan perkembangan
    perpustakaan pertumbuhan pertanggungjawaban
    profesional produktivitas program komputer
    perlindungan representasi responsibilitas
    revolusioner sains teknologi sebagaimana
    sebagainya semangat solidaritas standarisasi
    strategi struktural swadaya telekomunikasi
    transformasi transportasi transparansi
    universitas verifikasi visualisasi
  `
};

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getWordBank() {
  const limits = {
    easy: [2, 4],
    normal: [5, 7],
    hard: [8, 14]
  };

  const [min, max] = limits[selectedMode];

  return shuffle(
    [...new Set(
      WORDS[selectedMode]
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(word => word.length >= min && word.length <= max)
    )]
  );
}

const birdTypes = [
  "bird-raven", "bird-eagle", "bird-parrot", "bird-beo",
  "bird-pteranodon", "bird-peacock", "bird-toucan",
  "bird-owl", "bird-dove", "bird-flamingo"
];

const flightStyles = ["", "bank", "hover", "dive"];

function setScreen(screen) {
  menuScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  screen.classList.remove("hidden");

  // Mode layar penuh hanya aktif saat permainan berlangsung.
  document.body.classList.toggle("game-active", screen === gameScreen);
}

document.querySelectorAll(".mode-card").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode-card").forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
    selectedMode = button.dataset.mode;
  });
});

function startGame() {
  clearInterval(timer);
  clearTimeout(birdTimeout);
  clearTimeout(birdMotionTimeout);

  duration = durations[selectedMode];
  timeLeft = duration;
  score = 0;
  errors = 0;
  lives = 5;
  usedWords = [];
  wordList = getWordBank();
  startedAt = Date.now();
  gameActive = true;
  birdIsDying = false;

  setScreen(gameScreen);
  updateStats();
  nextWord();
  resetBird();
  typingInput.value = "";
  typingInput.focus();

  timer = setInterval(() => {
    if (!gameActive) return;

    timeLeft--;
    updateStats();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function nextWord() {
  if (!gameActive) return;

  if (wordList.length === 0) {
    wordList = getWordBank();
    usedWords = [];
  }

  let next = wordList.pop();

  while (next === currentWord && wordList.length > 0) {
    next = wordList.pop();
  }

  currentWord = next;
  typingInput.value = "";
  renderTarget();
  typingInput.focus();
}

function renderTarget() {
  const typed = typingInput.value;
  let html = "";

  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];

    if (i < typed.length) {
      if (typed[i] === letter) {
        html += `<span class="correct">${letter}</span>`;
      } else {
        html += `<span class="wrong">${letter}</span>`;
      }
    } else {
      html += `<span class="remaining">${letter}</span>`;
    }
  }

  targetWord.innerHTML = html;
}

function updateStats() {
  timeValue.textContent = timeLeft;
  scoreValue.textContent = score;

  const elapsedMinutes = Math.max((Date.now() - startedAt) / 60000, 1 / 60);
  wpmValue.textContent = Math.round(score / elapsedMinutes);

  livesValue.textContent = "❤️".repeat(lives) + "🖤".repeat(5 - lives);
}

function startBirdDescent() {
  clearTimeout(birdTimeout);

  if (!gameActive || birdIsDying) return;

  if (birdRiseAnimation) {
    birdRiseAnimation.cancel();
    birdRiseAnimation = null;
  }

  const arena = bird.parentElement;
  const arenaWidth = arena.clientWidth;
  const arenaHeight = arena.clientHeight;
  const birdWidth = bird.offsetWidth;
  const birdHeight = bird.offsetHeight;

  const minLeft = 12;
  const maxLeft = Math.max(minLeft, arenaWidth - birdWidth - 12);

  const currentTop = Math.max(
    8,
    Math.min(parseFloat(getComputedStyle(bird).top) || 8, arenaHeight - birdHeight - 8)
  );

  const currentLeft = Math.max(
    minLeft,
    Math.min(parseFloat(getComputedStyle(bird).left) || minLeft, maxLeft)
  );

  // Tujuan turun: bagian bawah dan bergeser lebih jauh ke kiri.
  const bottomPosition = arenaHeight - birdHeight - 12;
  const newLeft = Math.max(minLeft, currentLeft - 162.5);

  bird.style.top = `${currentTop}px`;
  bird.style.left = `${currentLeft}px`;

  birdRiseAnimation = bird.animate(
    [
      {
        top: `${currentTop}px`,
        left: `${currentLeft}px`,
        transform: "rotate(-5deg)"
      },
      {
        top: `${currentTop + (bottomPosition - currentTop) * 0.55}px`,
        left: `${Math.max(minLeft, currentLeft - 73.75)}px`,
        transform: "rotate(8deg)",
        offset: 0.55
      },
      {
        top: `${bottomPosition}px`,
        left: `${newLeft}px`,
        transform: "rotate(12deg)"
      }
    ],
    {
      duration: 4000,
      easing: "cubic-bezier(0.22, 0.75, 0.35, 1)",
      fill: "forwards"
    }
  );

  birdTimeout = setTimeout(() => {
    if (gameActive && !birdIsDying) {
      killBird();
    }
  }, 4000);

  birdRiseAnimation.onfinish = () => {
    if (!gameActive || birdIsDying) return;

    bird.style.top = `${bottomPosition}px`;
    bird.style.left = `${newLeft}px`;

    birdRiseAnimation.cancel();
    birdRiseAnimation = null;
  };
}

function resetBird() {
  clearTimeout(birdTimeout);
  clearTimeout(birdMotionTimeout);

  if (birdRiseAnimation) {
    birdRiseAnimation.cancel();
    birdRiseAnimation = null;
  }

  bird.classList.remove("dead", "falling", "rising", "bank", "hover", "dive");
  bird.classList.remove(...birdTypes);

  const type = birdTypes[Math.floor(Math.random() * birdTypes.length)];
  const style = flightStyles[Math.floor(Math.random() * flightStyles.length)];

  bird.classList.add(type);

  if (style) bird.classList.add(style);

  bird.style.transition = "none";
  bird.style.top = "20px";
  bird.style.left = `${25 + Math.random() * 35}%`;
  bird.style.opacity = "1";

  birdIsDying = false;

  void bird.offsetWidth;

  startBirdDescent();
}

function raiseSameBird() {
  clearTimeout(birdTimeout);

  if (!gameActive || birdIsDying) return;

  if (birdRiseAnimation) {
    birdRiseAnimation.cancel();
    birdRiseAnimation = null;
  }

  const arena = bird.parentElement;
  const arenaWidth = arena.clientWidth;
  const arenaHeight = arena.clientHeight;
  const birdWidth = bird.offsetWidth;
  const birdHeight = bird.offsetHeight;

  const minTop = 8;
  const maxTop = Math.max(minTop, arenaHeight - birdHeight - 12);

  const minLeft = 12;
  const maxLeft = Math.max(minLeft, arenaWidth - birdWidth - 12);

  const currentTop = Math.max(
    minTop,
    Math.min(parseFloat(getComputedStyle(bird).top) || minTop, maxTop)
  );

  const currentLeft = Math.max(
    minLeft,
    Math.min(parseFloat(getComputedStyle(bird).left) || minLeft, maxLeft)
  );

  // Naik lebih tinggi, tetapi tetap berada di dalam arena.
  const newTop = Math.max(minTop, currentTop - 120);

  // Bergerak ke kanan tanpa melewati batas arena.
  const newLeft = Math.min(maxLeft, currentLeft + 30);

  const middleTop = Math.max(minTop, currentTop - 85);
  const middleLeft = currentLeft + 16.5;

  bird.style.top = `${currentTop}px`;
  bird.style.left = `${currentLeft}px`;

  birdRiseAnimation = bird.animate(
    [
      {
        top: `${currentTop}px`,
        left: `${currentLeft}px`,
        transform: "rotate(0deg)"
      },
      {
        top: `${middleTop}px`,
        left: `${middleLeft}px`,
        transform: "rotate(-14deg)",
        offset: 0.55
      },
      {
        top: `${newTop}px`,
        left: `${newLeft}px`,
        transform: "rotate(-5deg)"
      }
    ],
    {
      duration: 200,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards"
    }
  );

  birdRiseAnimation.onfinish = () => {
    if (!gameActive || birdIsDying) return;

    bird.style.top = `${newTop}px`;
    bird.style.left = `${newLeft}px`;

    birdRiseAnimation.cancel();
    birdRiseAnimation = null;

    startBirdDescent();
  };
}

function killBird() {
  if (!gameActive || birdIsDying) return;

  birdIsDying = true;
  errors++;
  lives--;

  bird.classList.add("dead");
  bird.classList.remove("rising", "bank", "hover", "dive");
  bird.classList.add("falling");

  updateStats();

  if (lives <= 0) {
    setTimeout(endGame, 1200);
    return;
  }

  // Setelah burung mati, baru munculkan burung baru untuk kata berikutnya.
  setTimeout(() => {
    if (!gameActive) return;

    nextWord();
    resetBird();
  }, 1400);
}

function submitWord() {
  if (!gameActive || birdIsDying) return;

  const typed = typingInput.value.trim().toLowerCase();

  if (typed === currentWord) {
    score++;
    updateStats();

    raiseSameBird();
    nextWord();
  } else {
    errors++;
    lives--;
    updateStats();

    if (lives <= 0) {
      endGame();
      return;
    }

    // Kata salah langsung diganti, burung tetap sama.
    nextWord();
    resetBird();
  }
}

typingInput.addEventListener("input", () => {
  if (!gameActive || birdIsDying) return;

  // Batasi input sepanjang kata target.
  if (typingInput.value.length > currentWord.length) {
    typingInput.value = typingInput.value.slice(0, currentWord.length);
  }

  renderTarget();
});

typingInput.addEventListener("keydown", event => {
  if (event.code === "Space") {
    event.preventDefault();
    submitWord();
  }
});

function endGame() {
  if (!gameActive) return;

  gameActive = false;
  clearInterval(timer);
  clearTimeout(birdTimeout);
  clearTimeout(birdMotionTimeout);

  const totalTyped = score + errors;

  const accuracy = totalTyped > 0
    ? Math.round((score / totalTyped) * 100)
    : 0;

  const elapsedMinutes = Math.max((Date.now() - startedAt) / 60000, 1 / 60);
  const wpm = Math.round(score / elapsedMinutes);

  document.getElementById("finalScore").textContent = score;
  document.getElementById("finalErrors").textContent = errors;
  document.getElementById("finalAccuracy").textContent = `${accuracy}%`;
  document.getElementById("finalWpm").textContent = wpm;

  setScreen(resultScreen);
}

function goToMenu() {
  gameActive = false;
  clearInterval(timer);
  clearTimeout(birdTimeout);
  clearTimeout(birdMotionTimeout);

  setScreen(menuScreen);
}

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
menuButton.addEventListener("click", goToMenu);
quitButton.addEventListener("click", goToMenu);