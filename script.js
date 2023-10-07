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
    tanggal = tanggal < 10 ? "0" + tanggal : tanggal;
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
        "<span class='digital'><i class='fa-solid fa-clock' style='font-size: 2rem'></i> " +
        jam +
        ":" +
        min +
        ":" +
        sec +
        "</span>"
    );
  }, 1000);

  $("#saklar").on("click", () => {
    $.getJSON(linkGetData + "&V3", (data) => {
      if (data == 0) {
        $.getJSON(linkUpdate + "&V3=1", () => {});
        $("#saklar").addClass("on");
        $("#saklar").removeClass("off");
        $(".fa-plug").addClass("fa-plug-circle-bolt");
        $(".fa-plug").removeClass("fa-plug-circle-exclamation");
        $(".fa-plug").removeClass("fa-plug");
      } else if (data == 1) {
        $.getJSON(linkUpdate + "&V3=0", () => {});
        $("#saklar").addClass("off");
        $("#saklar").removeClass("on");
        $(".fa-plug").addClass("fa-plug-circle-exclamation");
        $(".fa-plug").removeClass("fa-plug-circle-bolt");
        $(".fa-plug").removeClass("fa-plug");
      }
    });
  });

  setInterval(() => {
    $.getJSON(linkGetData + "&V3", (saklar) => {
      if (saklar == 0) {
        $("#saklar").addClass("off");
        $("#saklar").removeClass("on");
        $(".plug").addClass("fa-plug-circle-exclamation");
        $(".plug").removeClass("fa-plug-circle-bolt");
        $(".plug").removeClass("fa-plug");
      } else {
        $("#saklar").addClass("on");
        $("#saklar").removeClass("off");
        $(".plug").addClass("fa-plug-circle-bolt");
        $(".plug").removeClass("fa-plug-circle-exclamation");
        $(".plug").removeClass("fa-plug");
      }
    });
  }, 1000);

  // pc on/off notif
  setInterval(() => {
    $.getJSON(linkGetData + "&V7", (power) => {
      if (power >= 0 && power < 3.5) {
        $("#alert").html(
          "<small><i class='fa-solid fa-plug-circle-xmark'></i> PC dalam keadaan mati, silakan teken tombol nyalakan PC untuk menyalakan</small>"
        );
        $("#indikatorCom").html(
          "<strong><small><i class='fa-solid fa-computer'></i> Mati</small></strong>"
        );
        location.reload();
      } else {
        $("#poweron").html(
          '<button id="pc" class="btno non" disabled><strong><i class="fa-solid fa-power-off"></i> PC</strong></button>'
        );
        $("#alert").html(
          "<small><i class='fa-solid fa-plug'></i> PC sudah dalam keadaan menyala, tombol nyalakan PC dinonaktifkan!</small>"
        );
        $("#indikatorCom").html(
          "<strong><small><i class='fa-solid fa-computer'></i> Nyala</small></strong>"
        );
      }
    });
  }, 1000);

  $("#pc").on("click", () => {
    $.getJSON(linkUpdate + "&V1=0", () => {});
  });
  // akhir pc on/off notif

  // saklar nyala/mati

  setInterval(() => {
    $.getJSON(linkGetData + "&V3", (saklar) => {
      if (saklar == 0) {
        $("#saklarNotif").html(
          "<small><i class='fa-solid fa-plug-circle-xmark'></i> Sensor jarak untuk menyalakan PC Nonaktif</small>"
        );
      } else {
        $("#saklarNotif").html(
          "<small><i class='fa-solid fa-plug-circle-check'></i> Sensor jarak untuk menyalakan PC Aktif</small>"
        );
      }
    });
  }, 1000);

  // akhir saklar nyala/mati

  // nilai sensor jarak
  setInterval(() => {
    $.getJSON(linkGetData + "&V2", (e) => {
      $("#jarak").html("<strong>" + e + "Cm" + "</strong>");
    });
  }, 500);
  // akhir nilai sensor jarak

  // cek alat aktif/nonaktif

  setInterval(() => {
    $.getJSON(
      "https://sgp1.blynk.cloud/external/api/isHardwareConnected?token=soXZJg279hW3tn231h_fE42iLqSkCGDO",
      (isHardwareConnected) => {
        if (isHardwareConnected == true) {
          $("#indikatorAlat").html(
            "<strong><small><i class='fa-solid fa-wifi'></i> Aktif</small></strong>"
          );
        } else {
          $("#indikatorAlat").html(
            "<strong><small><i class='fa-solid fa-wifi'></i> Nonaktif</small></strong>"
          );
        }
      }
    );
  }, 1000);

  // akhir cek alat aktif/nonaktif

  // cek ada/ tidak ada aliran listrik di pc

  setInterval(() => {
    $.getJSON(linkGetData + "&V9", (v) => {
      if (v == 0) {
        $("#voltase").html(
          "<small><i class='fa-solid fa-plug-circle-xmark'></i> PC tidak terhubung ke listrik!</small>"
        );
      } else {
        $("#voltase").html(
          "<small><strong><i class='fa-solid fa-bolt'></i> Voltase: " +
            v +
            "<sup>v</sup></strong></small>"
        );
        $("#indikatorVoltase").html(
          "<small><strong>Voltase: " + v + "<sup>v</sup></strong></small>"
        );
        $.getJSON(linkGetData + "&V7", (power) => {
          $("#power").html("<small>Power: " + power + "<sup>kW</sup></small>");
          $("#indikatorPower").html(
            "<small><strong>Power: " + power + "<sup>kW</sup></strong></small>"
          );
        });
        $.getJSON(linkGetData + "&V8", (energi) => {
          $("#energi").html(
            "<small>Energi: " + energi + "<sup>kWh</sup></small>"
          );
          $("#indikatorEnergi").html(
            "<small><strong>Energi: " +
              energi +
              "<sup>kWh</sup></strong></small>"
          );
        });
      }
    });
  }, 1000);

  // akhir cek ada/tidak ada aliran listrik di pc
});
