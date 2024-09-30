window.onload = function() {
    /*
    document.querySelectorAll('a').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
        });
    });
    */
    // Navbar için scroll olayı
    window.onscroll = function() {
        var navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) { /* 50px kaydırma sonrası */
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    /* Dil değiştirme işlevi*/
// function toggleLanguage() {
//     var turkishContent = document.getElementById('turkishContent');
//     var englishContent = document.getElementById('englishContent');
//     var languageButton = document.getElementById('languageToggle');

//     // Eğer Türkçe içerik görünüyorsa, İngilizce içeriği göster
//     if (turkishContent.style.display === "none") {
//         turkishContent.style.display = "block";
//         englishContent.style.display = "none";
//         languageButton.innerHTML = "ENGLISH";
//     } else {
//         turkishContent.style.display = "none";
//         englishContent.style.display = "block";
//         languageButton.innerHTML = "TURKISH";
//     }
// }

// // Butona click olayı ekle
// document.getElementById('languageToggle').addEventListener('click', toggleLanguage);

    // Galeri ve resim geçiş işlevselliği
    const images1 = ["images/ivr.jpg", "images/ivr2.jpg", "images/ivr3.jpg", "images/ivr4.jpg"];
    let currentImageIndex1 = 0;
    
    document.querySelector("#info1 .right-arrow").addEventListener("click", () => {
        currentImageIndex1 = (currentImageIndex1 + 1) % images1.length;
        document.querySelector("#info1 .gallery-image").src = images1[currentImageIndex1];
    });

    document.querySelector("#info1 .left-arrow").addEventListener("click", () => {
        currentImageIndex1 = (currentImageIndex1 - 1 + images1.length) % images1.length;
        document.querySelector("#info1 .gallery-image").src = images1[currentImageIndex1];
    });

    document.querySelector("#info1 .gallery-image").addEventListener("dblclick", () => {
        const modal = document.getElementById("fullscreenModal");
        const fullscreenImg = document.getElementById("fullscreenImg");
        fullscreenImg.src = images1[currentImageIndex1];
        modal.style.display = "block";
    });

    const images2 = ["images/recorder1.jpg", "images/recorder2.jpg", "images/recorder3.jpg", "images/recorder4.jpg"];
    let currentImageIndex2 = 0;

    document.querySelector("#info2 .right-arrow").addEventListener("click", () => {
        currentImageIndex2 = (currentImageIndex2 + 1) % images2.length;
        document.querySelector("#info2 .gallery-image").src = images2[currentImageIndex2];
    });

    document.querySelector("#info2 .left-arrow").addEventListener("click", () => {
        currentImageIndex2 = (currentImageIndex2 - 1 + images2.length) % images2.length;
        document.querySelector("#info2 .gallery-image").src = images2[currentImageIndex2];
    });

    document.querySelector("#info2 .gallery-image").addEventListener("dblclick", () => {
        const modal = document.getElementById("fullscreenModal");
        const fullscreenImg = document.getElementById("fullscreenImg");
        fullscreenImg.src = images2[currentImageIndex2];
        modal.style.display = "block";
    });

    // Tam ekran modundan çıkma
    document.querySelector(".fullscreen-modal .close").addEventListener("click", () => {
      document.getElementById("fullscreenModal").style.display = "none";
    });

    //--23 ağustos

    //3eylül
    // Sayfa yüklendiğinde ilk pastanın içeriğini göster, diğerlerini gizle
    var allInfoSections = document.querySelectorAll(".card-info, .card-info2");
    allInfoSections.forEach(function(section) {
        section.style.display = "none";
    });

    var info1 = document.getElementById("info1");
    if (info1) {
        info1.style.display = "block";
    }

    // Pasta dilimlerine tıklama olayını dinle
    var cards = document.querySelectorAll("li");
    cards.forEach(function(card, index) {
        card.addEventListener("click", function() {
            // Tıklanan dilim dışındaki tüm içerikleri gizle
            allInfoSections.forEach(function(section) {
                section.style.display = "none";
            });
    
            // Tıklanan dilime ait içeriği göster
            var infoSection = document.getElementById("info" + (index + 1));
            if (infoSection) {
                infoSection.style.display = "block";
            }
    
            // Sayfanın en üstünden 50px aşağı kaydır
            window.scrollTo({
                top: 550, // En üstten 50px aşağı
                behavior: 'smooth' // Yavaşça kaydır
            });
        });
    });
    
    
    
//3eylül


//BU KISIM COUNTER İÇİN
    var width = 100,  /* 400 / 4 */
    height = 100, /* 400 / 4 */
    timePassed = 0,
    timeLimit = 60,
    intervalId;

var fields = [{
  value: timeLimit,
  size: timeLimit,
  update: function() {
    return timePassed += 1;
  }
}];

var nilArc = d3.svg.arc()
  .innerRadius(width / 3 - 33.25) /* 133 / 4 */
  .outerRadius(width / 3 - 33.25) /* 133 / 4 */
  .startAngle(0)
  .endAngle(2 * Math.PI);

var arc = d3.svg.arc()
  .innerRadius(width / 3 - 13.75) /* 55 / 4 */
  .outerRadius(width / 3 - 6.25) /* 25 / 4 */
  .startAngle(0)
  .endAngle(function(d) {
    return ((d.value / d.size) * 2 * Math.PI);
  });

var svg = d3.select(".container").append("svg")
  .attr("width", width)
  .attr("height", height);

var field = svg.selectAll(".field")
  .data(fields)
  .enter().append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
  .attr("class", "field");

var back = field.append("path")
  .attr("class", "path path--background")
  .attr("d", arc);

var path = field.append("path")
  .attr("class", "path path--foreground");

var label = field.append("text")
  .attr("class", "label")
  .attr("dy", ".35em");

document.querySelector('.btn-request').addEventListener('click', function() {
  document.querySelector('.container').style.display = 'block';
  update();
});

function update() {
  field.each(function(d) {
    d.previous = d.value;
    d.value = d.update();
  });

  path.transition()
    .ease("elastic")
    .duration(500)
    .attrTween("d", arcTween);

  if ((timeLimit - timePassed) <= 10) {
    pulseText();
  } else {
    label.text(function(d) {
      return d.size - d.value;
    });
    document.getElementById('recordleft').textContent = timeLimit - timePassed;
  }

  if (timePassed <= timeLimit) {
    intervalId = setTimeout(update, 1000);
  } else {
    destroyTimer();
  }
}

function pulseText() {
  back.classed("pulse", true);
  label.classed("pulse", true);

  if ((timeLimit - timePassed) >= 0) {
    label.style("font-size", "30px") /* 120px / 4 */
      .attr("transform", "translate(0," + 1 + ")") /* 4 / 4 */
      .text(function(d) {
        return d.size - d.value;
      });
    document.getElementById('recordleft').textContent = timeLimit - timePassed;
  }

  label.transition()
    .ease("elastic")
    .duration(900)
    .style("font-size", "22.5px") /* 90px / 4 */
    .attr("transform", "translate(0," + -2.5 + ")"); /* -10 / 4 */
}

function destroyTimer() {
  clearTimeout(intervalId);
  label.transition()
    .ease("back")
    .duration(700)
    .style("opacity", "0")
    .style("font-size", "1.25px") /* 5px / 4 */
    .attr("transform", "translate(0," + -10 + ")") /* -40 / 4 */
    .each("end", function() {
      field.selectAll("text").remove();
    });

  path.transition()
    .ease("back")
    .duration(700)
    .attr("d", nilArc);

  back.transition()
    .ease("back")
    .duration(700)
    .attr("d", nilArc)
    .each("end", function() {
      field.selectAll("path").remove();
      document.querySelector('.container').style.display = 'none';
      timePassed = 0;
      document.getElementById('recordleft').textContent = timeLimit;
    });
}

function arcTween(b) {
  var i = d3.interpolate({ value: b.previous }, b);
  return function(t) {
    return arc(i(t));
  };
}

document.querySelector('.scrollup').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const loadSite2Button = document.getElementById('loadSite2');
//   const loadSite1Button = document.getElementById('loadSite1');

//   if (loadSite2Button) {
//       loadSite2Button.addEventListener('click', () => {
//           window.location.href = 'indexE.html';
//       });
//   }

//   if (loadSite1Button) {
//       loadSite1Button.addEventListener('click', () => {
//           window.location.href = 'index2.html';
//       });
//   }
// }); 




};

