$(document).ready(() => {
  let tokenBlynk = "soXZJg279hW3tn231h_fE42iLqSkCGDO";
  let linkGetData =
    "https://sgp1.blynk.cloud/external/api/get?token=" + tokenBlynk;
  let linkUpdate =
    "https://sgp1.blynk.cloud/external/api/update?token=" + tokenBlynk;
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  setInterval(() => {
    let time = new Date();
    let jam = time.getHours();
    jam = jam < 10 ? "0" + jam : jam;
    let min = time.getMinutes();
    min = min < 10 ? "0" + min : min;
    let sec = time.getSeconds();
    sec = sec < 10 ? "0" + sec : sec;
    let tanggal = time.getDate();
    let bulan = time.getMonth();
    let tahun = time.getFullYear();
    let hari = time.getDay();
    time.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" });
    $("#time").html(
      "<span class='tanggal'>" +
        days[hari] +
        ", " +
        tanggal +
        " " +
        months[bulan] +
        " " +
        tahun +
        "</span>" +
        "<span class='digital'>" +
        jam +
        ":" +
        min +
        ":" +
        sec +
        "</span>"
    );
  }, 1000);

  $("#saklar").on("click", () => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/get?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V3",
      (data) => {
        if (data == 0) {
          $.getJSON(
            "https://sgp1.blynk.cloud/external/api/update?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V3=1",
            () => {}
          );
          $("#saklar").addClass("on");
          $("#saklar").removeClass("off");
        } else if (data == 1) {
          $.getJSON(
            "https://sgp1.blynk.cloud/external/api/update?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V3=0",
            () => {}
          );
          $("#saklar").addClass("off");
          $("#saklar").removeClass("on");
        }
      }
    );
  });

  // pc on/off notif
  setInterval(() => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/get?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V7",
      (power) => {
        if (power > 0 && power < 3) {
          $("#alert").html(
            "<small>PC dalam keadaan mati, silakan teken tombol nyalakan PC untuk menyalakan</small>"
          );
        } else {
          $("#poweron").html(
            '<button id="pc" class="btno" disabled><strong>PC</strong></button>'
          );
          $("#alert").html(
            "<small>PC sudah dalam keadaan menyala, tombol nyalakan PC dinonaktifkan!</small>"
          );
        }
      }
    );
  }, 500);

  $("#pc").on("click", () => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/update?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V1=0",
      () => {}
    );
  });
  // akhir pc on/off notif

  // saklar nyala/mati

  setInterval(() => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/get?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V3",
      (saklar) => {
        if (saklar == 0) {
          $("#saklarNotif").html(
            "<small>Sensor jarak untuk menyalakan PC Nonaktif</small>"
          );
        } else {
          $("#saklarNotif").html(
            "<small>Sensor jarak untuk menyalakan PC Aktif</small>"
          );
        }
      }
    );
  }, 1000);

  // akhir saklar nyala/mati

  // nilai sensor jarak
  setInterval(() => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/get?token=soXZJg279hW3tn231h_fE42iLqSkCGDO&V2",
      (e) => {
        $("#jarak").html("<strong>" + e + "Cm" + "</strong>");
      }
    );
  }, 500);
  // akhir nilai sensor jarak

  // cek alat aktif/nonaktif

  setInterval(() => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/isHardwareConnected?token=soXZJg279hW3tn231h_fE42iLqSkCGDO",
      (isHardwareConnected) => {
        if (isHardwareConnected == true) {
          $("#indikatorAlat").html("Aktif");
        } else {
          $("#indikatorAlat").html("Nonaktif");
        }
      }
    );
  }, 1000);

  // akhir cek alat aktif/nonaktif

  // cek ada/ tidak ada aliran listrik di pc

  setInterval(() => {
    $.getJSON(linkGetData + "&V9", (v) => {
      if (v == 0) {
        $("#voltase").html("<small>PC tidak terhubung ke listrik!</small>");
      } else {
        $("#voltase").html(
          "<small><strong>Voltase: " + v + "V</strong></small>"
        );
        $.getJSON(linkGetData + "&V7", (power) => {
          $("#power").html("<small>Power: " + power + "kW</small>");
        });
        $.getJSON(linkGetData + "&V8", (energi) => {
          $("#energi").html("<small>Energi: " + energi + "kWh</small>");
        });
      }
    });
  }, 1000);

  // akhir cek ada/tidak ada aliran listrik di pc
});
