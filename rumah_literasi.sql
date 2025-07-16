-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2025 at 12:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumah_literasi`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `judul` varchar(150) NOT NULL,
  `pengarang` varchar(100) DEFAULT NULL,
  `penerbit` varchar(100) DEFAULT NULL,
  `tahun_terbit` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT 1,
  `lokasi_cabang_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `judul`, `pengarang`, `penerbit`, `tahun_terbit`, `jumlah`, `lokasi_cabang_id`) VALUES
(1, 'Belajar Membaca', 'Dewi Lestari', 'Gramedia', 2021, 5, 3),
(2, 'Kisah Si Anak Cerdas', 'Andi Wijaya', 'Bentang', 2020, 3, 1),
(3, 'Petualangan Anak Desa', 'Rina Hartati', 'Erlangga', 2019, 4, 4),
(4, 'Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, 8, 1),
(5, 'Laut Bercerita', 'Leila S. Chudori', 'Kepustakaan Populer Gramedia', 2017, 1, 4),
(6, 'Selena', 'Tere Liye', 'Gramedia Pustaka Utama', 2020, 20, 1),
(7, 'Dunia Sophie', 'Jostein Gaarder', 'Mizan', 2000, 6, 2),
(8, 'Negeri 5 Menara', 'Ahmad Fuadi', 'Gramedia', 2009, 10, 3),
(9, 'Sang Pemimpi', 'Andrea Hirata', 'Bentang', 2006, 7, 1),
(10, 'Ayat-Ayat Cinta', 'Habiburrahman El Shirazy', 'Republika', 2004, 12, 2),
(11, 'Perahu Kertas', 'Dee Lestari', 'Bentang Pustaka', 2009, 5, 4),
(12, 'Rindu', 'Tere Liye', 'Republika', 2014, 9, 3),
(13, 'Hafalan Shalat Delisa', 'Tere Liye', 'Republika', 2005, 6, 1),
(14, 'Sepatu Dahlan', 'Khrisna Pabichara', 'Noura Books', 2012, 4, 4),
(15, 'Bumi', 'Tere Liye', 'Gramedia', 2014, 20, 2),
(16, 'Hujan', 'Tere Liye', 'Gramedia', 2016, 15, 1),
(17, 'Filosofi Teras', 'Henry Manampiring', 'Kompas', 2018, 7, 2),
(18, 'Koala Kumal', 'Raditya Dika', 'GagasMedia', 2015, 6, 3),
(19, 'Dilan 1990', 'Pidi Baiq', 'Pastel Books', 2014, 11, 1),
(20, 'Orang-Orang Biasa', 'Andrea Hirata', 'Bentang Pustaka', 2019, 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `nama_cabang` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL,
  `penanggung_jawab` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `nama_cabang`, `alamat`, `penanggung_jawab`) VALUES
(1, 'RLI Cabang Surabaya', 'Jl. Mawar No. 10', 'Budi Santoso'),
(2, 'RLI Cabang Bandung', 'Jl. Dago No. 12', 'Naufal Hidayat'),
(3, 'RLI Cabang Jakarta', 'Jl. Kenanga No. 7', 'Dian Pratama'),
(4, 'RLI Cabang Banyuwangi', 'Jl. Ketapang No. 80', 'Tunggul Harwanto'),
(5, 'RLI Cabang Semarang', 'Jl. Pandanaran No. 25', 'Sinta Nirmala'),
(6, 'RLI Cabang Medan', 'Jl. Gatot Subroto No. 18', 'Ahmad Rifa’i'),
(7, 'RLI Cabang Makassar', 'Jl. AP Pettarani No. 33', 'M. Irfan'),
(8, 'RLI Cabang Denpasar', 'Jl. Diponegoro No. 15', 'Ni Made Wulandari'),
(9, 'RLI Cabang Palembang', 'Jl. Merdeka No. 40', 'Hendra Saputra'),
(10, 'RLI Cabang Malang', 'Jl. Ijen No. 22', 'Retno Ayu');

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `member_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `tanggal_pinjam` date DEFAULT NULL,
  `tanggal_kembali` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `member_id`, `book_id`, `tanggal_pinjam`, `tanggal_kembali`) VALUES
(1, 1, 3, '2025-06-24', '2025-07-02'),
(2, 2, 2, '2025-06-27', NULL),
(3, 3, 4, '2025-07-08', '2025-07-15'),
(4, 3, 6, '2025-07-14', NULL),
(5, 3, 1, '2025-07-07', '2025-07-14'),
(6, 3, 18, '2025-07-13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `nama`, `email`, `kelamin`, `no_hp`, `alamat`) VALUES
(1, 'Ahmad Fauzi', 'ahmad@mail.com', 'Laki-laki', '08123456789', 'Depok'),
(2, 'Rina Ayu', 'rina@mail.com', 'Perempuan', '08987654321', 'Jakarta'),
(3, 'Lestari Wulandari', 'lestari@mail.com', 'Perempuan', '082233445566', 'Surabaya'),
(4, 'Lukman Hairomin', 'lukmanganteng@gmail.com', 'Laki-laki', '085157522649', 'Tamansari'),
(5, 'Sholeh \'Aathif', 'sholeh@gmail.com', 'Laki-laki', '08987654321', 'Sobo'),
(6, 'Cahyo', 'cahyo@gmail.com', 'Laki-laki', '081234567890', 'Banyuwangi'),
(7, 'Ahmad Dahlan', 'dahlan@gmail.com', 'Laki-laki', '081265498326', 'Jakarta'),
(8, 'Ultima', 'ultima35@gmail.com', 'Laki-laki', '081638592468', 'Sobo'),
(9, 'Erdiyanto Luthfi', 'luthfi@gmail.com', 'Laki-laki', '081265498326', 'Brawijaya');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','anggota') NOT NULL,
  `id_anggota` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `id_anggota`) VALUES
(1, 'ultima', '$2b$10$kL9lDvQgUPvySK0mSOoIF.Tbqa9x2pqEczaGKqAQjMpykzV0lB1Ve', 'admin', 8),
(2, 'fauzi', '243261243132244D5752636F66636E6430396D66444165544F596672754A6972576E733065476D6A34724356744469534C7367774445594E656D7469', 'anggota', 1),
(3, 'rina', '$2a$12$MWRcofcnd09mfDAeTOYfruJirWns0eGmj4rCVtDiSLsgwDEYNemti', 'anggota', 2),
(4, 'lestari', '$2b$10$C9PIsMilmV7rKEprmwFf2OW6tyOGfvasnQXRqbx5s1kjzuE/CB3Gu', 'anggota', 3),
(5, 'lukman', '$2b$10$ti8xbPbLQDAuvMtMYNO9.e9WIDEo6we6w81eT6jwICulPShcLlFWu', 'anggota', 4),
(6, 'sholeh', '$2b$10$YFPlBx7ykxp8UrWj4GGjqe4NLTBIM4mpY81ja/WHFMKtGgnw276s6', 'anggota', 5),
(7, 'cahyo', '$2b$10$ZZYf35IFIAa1ndHdwPv8L.7fKsK1cwzDMUdS8pOp0d/9h2Ny2IK7a', 'anggota', 6),
(8, 'dahlan', '$2b$10$MjEflA9gevJL5dlOHQOWP.D20TUvIrzJSssIn12bIMbPrirPRQagC', 'anggota', 7),
(15, 'Lutfhi', '$2b$10$LmYWL4IYcpcjUXHSFSJBVOhymnFabkBl8ciEJHnWUD/ORTIg0f4nu', 'admin', 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lokasi_cabang_id` (`lokasi_cabang_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `member_id` (`member_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`lokasi_cabang_id`) REFERENCES `branches` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  ADD CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
