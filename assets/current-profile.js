(() => {
  const profiles = {
    "sabrina-brachypelma-hamorii": {
      resident: "Sabrina",
      species: "Brachypelma hamorii",
      group: "Tarantula",
      image: "sabrina-brachypelma-hamorii.jpg",
      alt: "Sabrina, a Brachypelma hamorii tarantula with vivid orange knee markings",
      intro: "Sabrina is the Brachypelma hamorii currently in my care. Her collection portrait is built around the vivid orange knee markings that make her immediately recognisable.",
      photoNote: "A clear, low portrait showing Sabrina’s full leg span and contrasting orange bands.",
      video: { id: "IXY2w7nUmoA", title: "Meet Sabrina: My Mexican red-knee tarantula", note: "A short introduction to Sabrina and the markings that make Brachypelma hamorii so recognisable." }
    },
    "ceratogyrus-darlingi": {
      resident: "Current resident",
      species: "Ceratogyrus darlingi",
      group: "Tarantula",
      image: "ceratogyrus-darlingi.jpg",
      alt: "Ceratogyrus darlingi in a naturalistic enclosure",
      intro: "This Ceratogyrus darlingi is part of the current Introvertebrates collection. The profile photograph places the animal within a sandy, planted terrestrial scene.",
      photoNote: "A habitat-led portrait, with the spider emerging through grasses and substrate.",
      video: { id: "WvyBlNpTxQI", title: "Introducing my Ceratogyrus darlingi", note: "A closer introduction to this current resident and its place in the Introvertebrates collection." }
    },
    "chilobrachys-fimbriatus": {
      resident: "Current resident",
      species: "Chilobrachys fimbriatus",
      group: "Tarantula",
      image: "chilobrachys-fimbriatus.jpg",
      alt: "Chilobrachys fimbriatus in a heavily webbed retreat",
      intro: "This Chilobrachys fimbriatus is part of the current collection. Its portrait focuses as much on the dense webbed retreat as on the spider itself.",
      photoNote: "Web, prey remains, and the animal’s position make this a useful behaviour-led image.",
      video: { id: "iPIhIsNKUaY", title: "Rehousing my Chilobrachys fimbriatus", note: "A full rehousing video showing the animal, its retreat, and the enclosure work behind the profile." }
    },
    "chilobrachys-kaeng-krachan": {
      resident: "Current resident",
      species: "Chilobrachys sp. “Kaeng Krachan”",
      group: "Tarantula",
      image: "chilobrachys-kaeng-krachan.jpg",
      alt: "Close portrait of Chilobrachys sp. Kaeng Krachan",
      intro: "This Chilobrachys sp. “Kaeng Krachan” is part of the current collection. The profile begins with a close, eye-level portrait from within the enclosure.",
      photoNote: "A low-angle macro that brings the eyes and pedipalps forward while retaining the dark retreat.",
      video: { id: "-axko1BGf0s", title: "Building a jungle paludarium for Chilobrachys sp. Kaeng Krachan", note: "The complete enclosure build behind this resident’s dark, humid presentation." }
    },
    "elvira-chilobrachys-natanicharum": {
      resident: "Elvira",
      species: "Chilobrachys natanicharum",
      group: "Tarantula",
      image: "elvira-chilobrachys-natanicharum.jpg",
      alt: "Close portrait of Elvira, a Chilobrachys natanicharum tarantula",
      intro: "Elvira is the Chilobrachys natanicharum currently in my care. Her profile portrait uses the darkness of the retreat to isolate the eyes and carapace.",
      photoNote: "A close portrait with restrained light across Elvira’s face and front legs.",
      video: { id: "V_QQOjU2T28", title: "Chilobrachys natanicharum: The most beautiful tarantula", note: "A species-focused look at the electric-blue tarantula represented in the collection by Elvira." }
    },
    "ruby-chromatopelma-cyaneopubescens": {
      resident: "Ruby",
      species: "Chromatopelma cyaneopubescens",
      group: "Tarantula",
      image: "ruby-chromatopelma-cyaneopubescens.jpg",
      alt: "Close-up of Ruby, a Chromatopelma cyaneopubescens tarantula",
      intro: "Ruby is the Chromatopelma cyaneopubescens currently in my care. Her portrait brings together the species’ blue-green legs, warm carapace, and dense surface detail.",
      photoNote: "An intimate macro portrait with the eyes and carapace held in sharp focus.",
      video: { id: "SYVBvfz9fh8", title: "Ruby’s best strikes since day one", note: "A fast collection of Ruby’s feeding responses, presented as an Introvertebrates Short." }
    },
    "grammostola-pulchripes": {
      resident: "Current resident",
      species: "Grammostola pulchripes",
      group: "Tarantula",
      image: "grammostola-pulchripes.jpg",
      alt: "Grammostola pulchripes showing its golden knee stripes",
      intro: "This Grammostola pulchripes is part of the current collection. Its portrait is centred on the strong golden knee bands and full-body silhouette.",
      photoNote: "A broad, readable profile that preserves the leg span and the dark enclosure around it.",
      video: { id: "Uveo9KLDKro", title: "Meet the Chaco golden-knee tarantula up close", note: "A species-focused introduction to Grammostola pulchripes and its distinctive golden bands." }
    },
    "linothele-fallax": {
      resident: "Current resident",
      species: "Linothele fallax",
      group: "Curtain-web spider",
      image: "linothele-fallax.jpg",
      alt: "Linothele fallax showing its orange carapace and striped abdomen",
      intro: "This Linothele fallax represents the other-spider side of the current collection. Its profile photograph shows the orange carapace and distinctly patterned abdomen.",
      photoNote: "A close overhead portrait selected from the intact portion of the original frame.",
      video: { id: "6yuCc4-XAwU", title: "Spider snapshot: Linothele fallax", note: "A compact species snapshot of the tiger curtain-web spider." }
    },
    "sonja-mauremys-reevesii": {
      resident: "Sonja",
      species: "Mauremys reevesii",
      group: "Reeves’s turtle",
      image: "sonja-mauremys-reevesii.jpg",
      alt: "Sonja, a Reeves’s turtle, looking toward the camera in dark water",
      intro: "Sonja is the Reeves’s turtle currently in my care and the only vertebrate in the collection. Her portrait keeps the surrounding water dark so the face and shell emerge gradually.",
      photoNote: "A quiet, low-light portrait centred on Sonja’s direct gaze.",
      video: { id: "lEVuJhaAlNY", title: "Sonja’s new home", note: "A complete look at the home created for Sonja, the collection’s Reeves’s turtle." }
    },
    "bella-monocentropus-balfouri": {
      resident: "Bella",
      species: "Monocentropus balfouri",
      group: "Tarantula",
      image: "bella-monocentropus-balfouri.jpg",
      alt: "Bella, a blue and cream Monocentropus balfouri tarantula",
      intro: "Bella is one of two Monocentropus balfouri currently in my care. Her profile uses the stronger open portrait, with blue legs and a pale carapace visible across the frame.",
      photoNote: "A bright, colour-led image that distinguishes Bella’s profile from Belinda’s burrow portrait.",
      video: { id: "fjac-dh_wAQ", title: "Discover Bella: Monocentropus balfouri", note: "A short individual introduction to Bella and her distinctive blue-and-cream colouring." }
    },
    "belinda-monocentropus-balfouri": {
      resident: "Belinda",
      species: "Monocentropus balfouri",
      group: "Tarantula",
      image: "belinda-monocentropus-balfouri.jpg",
      alt: "Belinda, a Monocentropus balfouri tarantula, partly visible in her burrow",
      intro: "Belinda is the second Monocentropus balfouri currently in my care. Her available portrait is more secretive, showing her partly visible within the retreat.",
      photoNote: "The current image is a useful record, though a cleaner standalone portrait is still on the photography list.",
      video: { id: "ghR2QufL78U", title: "The science behind a vivarium: Belinda’s new setup", note: "A longer build and husbandry video centred on Belinda’s enclosure." }
    },
    "omothymus-violaceopes": {
      resident: "Current resident",
      species: "Omothymus violaceopes",
      group: "Tarantula",
      image: "omothymus-violaceopes.jpg",
      alt: "Dark close portrait of an Omothymus violaceopes tarantula",
      intro: "This Omothymus violaceopes is part of the current collection. The profile portrait preserves the dark enclosure atmosphere while bringing out the face and front legs.",
      photoNote: "A deliberately low-key portrait; a brighter edited companion image would strengthen the future gallery.",
      video: { id: "UPEjF670oIA", title: "Meet Omothymus violaceopes: The stunning blue tarantula", note: "A species-focused introduction to the Singapore blue tarantula." }
    },
    "clara-psalmopoeus-irminia": {
      resident: "Clara",
      species: "Psalmopoeus irminia",
      group: "Tarantula",
      image: "clara-psalmopoeus-irminia.jpg",
      alt: "Clara, a Psalmopoeus irminia tarantula, peering through green leaves",
      intro: "Clara is the Psalmopoeus irminia currently in my care. Her photograph is one of the most atmospheric in the collection, placing her face between dark foliage and soft green light.",
      photoNote: "A cinematic enclosure portrait that rewards a slower look rather than revealing the whole animal at once.",
      video: { id: "F8HVJVy4PdE", title: "Meet Clara: The Venezuelan sun tiger", note: "A full introduction to Clara and Psalmopoeus irminia on the Introvertebrates channel." }
    },
    "psyttala-horrida": {
      resident: "Current colony",
      species: "Psyttala horrida",
      group: "Assassin bug",
      image: "psyttala-horrida.jpg",
      alt: "A Psyttala horrida assassin bug resting on vivid pink and green leaves",
      intro: "Psyttala horrida brings a different shape and scale to the current collection. The profile image places the dark assassin bug against vivid pink and green foliage.",
      photoNote: "A colour-rich environmental portrait with the insect held against a patterned leaf.",
      video: { id: "sr930b5ycrg", title: "Creating a beautiful assassin bug habitat", note: "The enclosure build and environmental thinking behind the assassin bugs in the collection." }
    },
    "pachnoda-marginata": {
      resident: "Current colony",
      species: "Pachnoda marginata",
      group: "Sun beetle",
      image: "pachnoda-marginata.jpg",
      alt: "Pachnoda marginata sun beetles clustered on a branch",
      intro: "Pachnoda marginata represents the beetles in the current collection. The profile photograph shows several individuals using the same branching structure.",
      photoNote: "A group portrait that keeps both the bold markings and the social enclosure context visible.",
      video: { id: "o7Ja1Ro3jDo", title: "The beautiful lives of sun beetles", note: "A longer look at the sun beetles’ life cycle, behaviour, and enclosure." }
    },
    "siuzi-theraphosa-apophysis": {
      resident: "Siuzi",
      species: "Theraphosa apophysis",
      group: "Tarantula",
      image: "siuzi-theraphosa-apophysis.jpg",
      alt: "Siuzi, a Theraphosa apophysis tarantula, in a close feeding portrait",
      intro: "Siuzi is the Theraphosa apophysis currently in my care. Her current profile image is a close feeding portrait with warm substrate and retreat details around her.",
      photoNote: "A behaviour-led image selected for its proximity and texture rather than a formal full-body pose.",
      video: { id: "f3f4iNm1e7k", title: "When mold grows on a tarantula: A case study with Siuzi", note: "A detailed, individual case study documenting Siuzi and the response to an unusual health concern." }
    }
  };

  const root = document.querySelector("[data-current-profile]");
  const key = document.body.dataset.profile;
  const profile = profiles[key];
  if (!root || !profile) return;

  const namedResident = !profile.resident.startsWith("Current ");
  const title = namedResident ? profile.resident : profile.species;
  const subtitle = namedResident ? profile.species : "Current collection profile";

  root.innerHTML = `
    <header class="site-header">
      <div class="header-inner species-shell">
        <a class="brand" href="../index.html" aria-label="Introvertebrates home">
          <img src="../Only spider.png" alt="" width="500" height="500">
          <span>Introvertebrates</span>
        </a>
        <nav class="site-nav" aria-label="Primary navigation">
          <a href="../index.html">Home</a>
          <a href="../collection.html" aria-current="page">Collection</a>
          <a href="../research.html">Research</a>
          <a href="../index.html#videos">Videos</a>
          <a href="../index.html#about">About</a>
          <a href="../index.html#codex">Codex</a>
        </nav>
      </div>
    </header>

    <main id="main-content" class="species-page compact-profile-page">
      <section class="species-hero species-shell" aria-labelledby="profile-title">
        <div class="hero-copy">
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="../collection.html">Current collection</a><span aria-hidden="true">/</span><span>Profile</span>
          </nav>
          <p class="eyebrow">Current resident · ${profile.group}</p>
          <h1 id="profile-title">${title}</h1>
          <p class="common-name"><i>${subtitle}</i></p>
          <p class="species-lede">${profile.intro}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#collection-record">Explore this profile</a>
            <a class="button" href="../collection.html">Back to all residents</a>
          </div>
        </div>
        <figure class="hero-portrait">
          <img src="../assets/collection/${profile.image}" alt="${profile.alt}" width="1600" height="898" loading="eager" fetchpriority="high">
          <figcaption>${profile.resident} · photographed in the Introvertebrates collection</figcaption>
        </figure>
      </section>

      <section class="facts-strip species-shell" aria-label="Profile facts">
        <div class="fact"><span class="fact-label">Scientific name</span><span class="fact-value"><i>${profile.species}</i></span></div>
        <div class="fact"><span class="fact-label">Resident</span><span class="fact-value">${profile.resident}</span></div>
        <div class="fact"><span class="fact-label">Collection group</span><span class="fact-value">${profile.group}</span></div>
        <div class="fact"><span class="fact-label">Status</span><span class="fact-value">Currently in my care</span></div>
      </section>

      <section class="profile-section species-shell" id="collection-record" aria-labelledby="collection-record-title">
        <header class="section-heading"><p class="section-kicker">Collection record</p><h2 id="collection-record-title">In my care.</h2></header>
        <div class="section-copy">
          <h3>The current portrait</h3>
          <p>${profile.photoNote}</p>
          <aside class="context-note">
            <strong>A profile with room to grow</strong>
            <p>This permanent profile route is now connected to the collection. Research-led natural history and privacy-reviewed Codex observations will be added here as their sources are checked—without filling gaps with guessed care parameters.</p>
          </aside>
        </div>
      </section>

      <section class="profile-section species-shell profile-video-section" aria-labelledby="profile-video-title">
        <header class="section-heading"><p class="section-kicker">From the channel</p><h2 id="profile-video-title">Watch this resident.</h2></header>
        <div class="section-copy">
          <article class="profile-video-card">
            <div class="profile-video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/${profile.video.id}" title="${profile.video.title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="profile-video-copy">
              <span class="profile-video-label">Introvertebrates on YouTube</span>
              <h3>${profile.video.title}</h3>
              <p>${profile.video.note}</p>
              <a class="profile-video-link" href="https://www.youtube.com/watch?v=${profile.video.id}" target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </section>

      <section class="profile-section species-shell" aria-labelledby="codex-title">
        <header class="section-heading"><p class="section-kicker">Personal observations</p><h2 id="codex-title">From the Codex.</h2></header>
        <div class="section-copy">
          <div class="codex-panel">
            <span class="codex-label">Introvertebrates Codex</span>
            <h3>${profile.resident} · keeper record</h3>
            <p class="codex-intro">This area is reserved for a privacy-safe summary of feeding, molts, measurements, and time in care. Personal notes, IDs, contacts, enclosure identifiers, local paths, and exact private event dates will not be published.</p>
            <p class="codex-status">Awaiting a privacy-reviewed Codex export. No invented statistics are shown.</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner species-shell">
        <span>© 2026 Introvertebrates</span>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="../index.html">Home</a><a href="../collection.html">Collection</a><a href="../research.html">Research</a><a href="https://www.youtube.com/@Introvertebrates" target="_blank" rel="noopener noreferrer">YouTube</a><a href="https://www.instagram.com/introvertebrates_yt/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:erlend@introvertebrates.com">Contact</a>
        </nav>
      </div>
    </footer>
  `;
})();
