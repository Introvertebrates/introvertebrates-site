/*
 * Canonical content source for the generated resident profile pages.
 * After editing profile copy, media, or links, run:
 *   node tools/build-static-profile-pages.mjs
 * The legacy browser renderer remains here as a compatibility fallback.
 */
(() => {
  const profiles = {
    "sabrina-brachypelma-hamorii": {
      resident: "Sabrina",
      species: "Brachypelma hamorii",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Mexico",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "The World Spider Catalog treats Brachypelma hamorii as an accepted Mexican species in the family Theraphosidae. Its taxonomic history matters because animals now identified as B. hamorii were frequently presented under the name B. smithi in older literature and in the hobby.",
        "This profile therefore uses the full accepted name rather than relying on the broad “Mexican red-knee” label. The catalog also flags international trade restrictions, making provenance and accurate identification part of the species story."
      ],
      sources: [{ label: "World Spider Catalog — Brachypelma hamorii", url: "https://wsc.nmbe.ch/spec-data/43881" }],
      image: "sabrina-brachypelma-hamorii.jpg",
      alt: "Sabrina, a Brachypelma hamorii tarantula with vivid orange knee markings",
      intro: "Sabrina is the Brachypelma hamorii currently in my care. Her collection portrait is built around the vivid orange knee markings that make her immediately recognisable.",
      gallery: [
        { file: "sabrina-close.jpg", alt: "Sabrina resting beside cork bark with her orange knee markings visible", caption: "Sabrina · close view · 2026" },
        { file: "sabrina-habitat.jpg", alt: "Sabrina positioned among wood and dry enclosure planting", caption: "Sabrina in her habitat · 2026" },
        { file: "sabrina-retreat.jpg", alt: "Sabrina resting at the curved entrance to her retreat", caption: "At the retreat · 2024" }
      ],
      video: { id: "IXY2w7nUmoA", title: "Meet Sabrina: My Mexican red-knee tarantula", note: "A short introduction to Sabrina and the markings that make Brachypelma hamorii so recognisable." }
    },
    "ceratogyrus-darlingi": {
      resident: "Current resident",
      species: "Ceratogyrus darlingi",
      group: "Tarantula",
      sex: "Confirmed male",
      family: "Theraphosidae",
      range: "Southern Africa",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Ceratogyrus darlingi is an accepted theraphosid species with a catalogued distribution across southern Africa. It was described by R. I. Pocock in 1897 and is the type species of the genus Ceratogyrus.",
        "The species has accumulated several historical names and interpretations, later reviewed in work on African Harpactirinae. This page follows the current catalogued combination and keeps broader behavioural claims separate from the documented collection record."
      ],
      sources: [{ label: "World Spider Catalog — Ceratogyrus darlingi", url: "https://wsc.nmbe.ch/spec-data/43902" }],
      image: "ceratogyrus-darlingi.jpg",
      alt: "Ceratogyrus darlingi in a naturalistic enclosure",
      intro: "This Ceratogyrus darlingi is part of the current Introvertebrates collection. The profile photograph places the animal within a sandy, planted terrestrial scene.",
      gallery: [
        { file: "darlingi-retreat.jpg", alt: "Ceratogyrus darlingi partly visible within a webbed wooden retreat", caption: "Inside the retreat · 2025" },
        { file: "darlingi-overhead.jpg", alt: "Overhead view of Ceratogyrus darlingi on textured bark", caption: "Dorsal view · 2025" },
        { file: "darlingi-terrestrial.jpg", alt: "Ceratogyrus darlingi walking across pale sandy substrate", caption: "Terrestrial enclosure · 2025" }
      ],
      video: { id: "WvyBlNpTxQI", title: "Introducing my Ceratogyrus darlingi", note: "A closer introduction to this current resident and its place in the Introvertebrates collection." }
    },
    "chilobrachys-fimbriatus": {
      resident: "Current resident",
      species: "Chilobrachys fimbriatus",
      group: "Tarantula",
      sex: "Unknown",
      family: "Theraphosidae",
      range: "India",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Chilobrachys fimbriatus is an accepted Indian tarantula described by Pocock in 1899. The World Spider Catalog places it in Theraphosidae and records a later taxonomic history involving the name Ischnocolus decoratus.",
        "The dense webbing shown in this resident’s photographs and rehousing video is a direct collection observation. It is presented here as evidence from this individual rather than converted into unsupported universal care rules."
      ],
      sources: [{ label: "World Spider Catalog — Chilobrachys fimbriatus", url: "https://wsc.nmbe.ch/species/37298/Chilobrachys_fimbriatus" }],
      image: "chilobrachys-fimbriatus.jpg",
      alt: "Chilobrachys fimbriatus in a heavily webbed retreat",
      intro: "This Chilobrachys fimbriatus is part of the current collection. Its portrait focuses as much on the dense webbed retreat as on the spider itself.",
      gallery: [
        { file: "fimbriatus-webbing.jpg", alt: "Chilobrachys fimbriatus visible through dense white webbing", caption: "Dense web structure · 2025" },
        { file: "fimbriatus-retreat.jpg", alt: "Chilobrachys fimbriatus partly concealed among leaves and substrate", caption: "At the retreat entrance · 2025" },
        { file: "fimbriatus-detail.jpg", alt: "Close view of Chilobrachys fimbriatus surrounded by layered webbing", caption: "Webbing detail · 2025" }
      ],
      video: { id: "iPIhIsNKUaY", title: "Rehousing my Chilobrachys fimbriatus", note: "A full rehousing video showing the animal, its retreat, and the enclosure work behind the profile." }
    },
    "chilobrachys-kaeng-krachan": {
      resident: "Current resident",
      species: "Chilobrachys sp. “Kaeng Krachan”",
      group: "Tarantula",
      sex: "Unknown",
      family: "Theraphosidae",
      range: "Hobby locality label; exact range unresolved",
      taxonomicStatus: "Informal designation",
      naturalHistory: [
        "Chilobrachys sp. “Kaeng Krachan” is an informal hobby designation, not a formally published binomial with an author and description. The name is retained because it is the label attached to this individual, but it should not be treated as a settled species identification.",
        "The World Spider Catalog recognises the genus Chilobrachys while not listing “Kaeng Krachan” as an accepted species. Until a formal revision connects this hobby form to described material, the profile deliberately avoids precise range, conservation, and species-level biological claims."
      ],
      sources: [{ label: "World Spider Catalog — genus Chilobrachys", url: "https://www.wsc.nmbe.ch/genus-catalog/3515/Chilobrachys" }],
      image: "chilobrachys-kaeng-krachan.jpg",
      alt: "Close portrait of Chilobrachys sp. Kaeng Krachan",
      intro: "This Chilobrachys sp. “Kaeng Krachan” is part of the current collection. The profile begins with a close, eye-level portrait from within the enclosure.",
      gallery: [
        { file: "kaeng-webbing.jpg", alt: "Chilobrachys sp. Kaeng Krachan standing on a broad sheet of webbing", caption: "On the web sheet · 2026" },
        { file: "kaeng-full-body.jpg", alt: "Full-body view of Chilobrachys sp. Kaeng Krachan inside the enclosure", caption: "Full-body view · 2025" },
        { file: "kaeng-paludarium.jpg", alt: "Planted paludarium built for Chilobrachys sp. Kaeng Krachan", caption: "The paludarium · 2025" }
      ],
      video: { id: "-axko1BGf0s", title: "Building a jungle paludarium for Chilobrachys sp. Kaeng Krachan", note: "The complete enclosure build behind this resident’s dark, humid presentation." }
    },
    "elvira-chilobrachys-natanicharum": {
      resident: "Elvira",
      species: "Chilobrachys natanicharum",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Thailand",
      taxonomicStatus: "Described in 2023",
      naturalHistory: [
        "Chilobrachys natanicharum was formally described from Thailand in 2023. Before that publication, the electric-blue form was already known in the pet trade, but it lacked a published scientific description tying the name to diagnostic material.",
        "The original ZooKeys paper provides the taxonomic baseline for the species and documents the blue structural colour that made it conspicuous. Elvira’s portrait adds an individual collection record without replacing that formal description."
      ],
      sources: [{ label: "ZooKeys — original description of Chilobrachys natanicharum", url: "https://zookeys.pensoft.net/article/106278/" }],
      image: "elvira-chilobrachys-natanicharum.jpg",
      alt: "Close portrait of Elvira, a Chilobrachys natanicharum tarantula",
      intro: "Elvira is the Chilobrachys natanicharum currently in my care. Her profile portrait uses the darkness of the retreat to isolate the eyes and carapace.",
      gallery: [
        { file: "elvira-blue-detail.jpg", alt: "Elvira showing electric-blue colour on her legs within the webbed retreat", caption: "Electric-blue detail · 2024" },
        { file: "elvira-retreat.jpg", alt: "Elvira positioned at the edge of a heavily webbed retreat", caption: "At the retreat · 2024" },
        { file: "elvira-full-body.jpg", alt: "Full-body view of Elvira against moss and dark substrate", caption: "Full-body view · 2024" }
      ],
      video: { id: "V_QQOjU2T28", title: "Chilobrachys natanicharum: The most beautiful tarantula", note: "A species-focused look at the electric-blue tarantula represented in the collection by Elvira." }
    },
    "ruby-chromatopelma-cyaneopubescens": {
      resident: "Ruby",
      species: "Chromatopelma cyaneopubescens",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Venezuela",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Chromatopelma cyaneopubescens is the accepted type species of Chromatopelma and the only currently recognised species in the genus. The World Spider Catalog records its distribution in Venezuela.",
        "The combination of blue-green legs and a warm carapace is visually prominent in Ruby’s photographs, but colour alone is not used here as an identification key. The accepted name and distribution follow the catalogued taxonomic record."
      ],
      sources: [{ label: "World Spider Catalog — Chromatopelma cyaneopubescens", url: "https://www.wsc.nmbe.ch/spec-data/43941" }],
      image: "ruby-chromatopelma-cyaneopubescens.jpg",
      alt: "Close-up of Ruby, a Chromatopelma cyaneopubescens tarantula",
      intro: "Ruby is the Chromatopelma cyaneopubescens currently in my care. Her portrait brings together the species’ blue-green legs, warm carapace, and dense surface detail.",
      gallery: [
        { file: "ruby-feeding.jpg", alt: "Ruby feeding on the enclosure surface with blue legs and an orange abdomen visible", caption: "Feeding response · 2026" },
        { file: "ruby-colour.jpg", alt: "Close dorsal view of Ruby showing blue legs and a warm orange abdomen", caption: "Colour and texture · 2025" },
        { file: "ruby-full-body.jpg", alt: "Full-body view of Ruby standing on webbed substrate", caption: "Full-body view · 2025" }
      ],
      video: { id: "SYVBvfz9fh8", title: "Ruby’s best strikes since day one", note: "A fast collection of Ruby’s feeding responses, presented as an Introvertebrates Short." }
    },
    "grammostola-pulchripes": {
      resident: "Current resident",
      species: "Grammostola pulchripes",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Brazil, Paraguay and Argentina",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Grammostola pulchripes is an accepted theraphosid recorded from Brazil, Paraguay, and Argentina. It was originally described in Eurypelma in 1891 and moved into Grammostola soon afterwards.",
        "The familiar “Chaco golden-knee” name is useful descriptive shorthand, while the scientific profile retains the broader catalogued range. The individual’s strong leg bands are documented through the collection photography and video."
      ],
      sources: [{ label: "World Spider Catalog — Grammostola pulchripes", url: "https://wsc.nmbe.ch/spec-data/44063/Grammostola_pulchripes" }],
      image: "grammostola-pulchripes.jpg",
      alt: "Grammostola pulchripes showing its golden knee stripes",
      intro: "This Grammostola pulchripes is part of the current collection. Its portrait is centred on the strong golden knee bands and full-body silhouette.",
      gallery: [
        { file: "pulchripes-close.jpg", alt: "Close view of Grammostola pulchripes showing the pale bands on its legs", caption: "Golden-knee detail · 2024" },
        { file: "pulchripes-terrestrial.jpg", alt: "Grammostola pulchripes resting on reddish terrestrial substrate", caption: "Terrestrial view · 2024" },
        { file: "pulchripes-habitat.jpg", alt: "Grammostola pulchripes beside cork bark and dry enclosure planting", caption: "In the enclosure · 2024" }
      ],
      video: { id: "Uveo9KLDKro", title: "Meet the Chaco golden-knee tarantula up close", note: "A species-focused introduction to Grammostola pulchripes and its distinctive golden bands." }
    },
    "linothele-fallax": {
      resident: "Current resident",
      species: "Linothele fallax",
      group: "Curtain-web spider",
      sex: "Unknown",
      family: "Dipluridae",
      range: "Bolivia and Brazil",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Linothele fallax is a South American mygalomorph recorded from Bolivia and Brazil. It belongs to Dipluridae rather than Theraphosidae, so it is a close mygalomorph relative of tarantulas but is not itself a tarantula.",
        "The species was originally described as Diplura fallax in 1926 and later placed in Linothele. Its orange carapace and patterned abdomen make the current resident visually distinctive, while the family placement supplies the more important biological context."
      ],
      sources: [{ label: "World Spider Catalog — genus Linothele", url: "https://www.wsc.nmbe.ch/genus-catalog/991/Linothele" }],
      image: "linothele-fallax.jpg",
      alt: "Linothele fallax showing its orange carapace and striped abdomen",
      intro: "This Linothele fallax represents the other-spider side of the current collection. Its profile photograph shows the orange carapace and distinctly patterned abdomen.",
      gallery: [
        { file: "fallax-webbing.jpg", alt: "Linothele fallax standing on dense white curtain webbing", caption: "Curtain webbing · 2025" },
        { file: "fallax-overhead.jpg", alt: "Overhead view of Linothele fallax showing its orange carapace and patterned abdomen", caption: "Dorsal markings · 2025" },
        { file: "fallax-habitat.jpg", alt: "Linothele fallax partly visible among leaf litter and moss", caption: "Habitat view · 2025" }
      ],
      video: { id: "6yuCc4-XAwU", title: "Spider snapshot: Linothele fallax", note: "A compact species snapshot of the tiger curtain-web spider." }
    },
    "sonja-mauremys-reevesii": {
      resident: "Sonja",
      species: "Mauremys reevesii",
      group: "Reeves’s turtle",
      sex: "Confirmed female",
      family: "Geoemydidae",
      range: "East Asia",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Mauremys reevesii is a geoemydid freshwater turtle native to East Asia. Authoritative range summaries place native populations across temperate and subtropical China and the Korean Peninsula, with the status of populations elsewhere complicated by introductions and historical movement.",
        "Sonja’s profile is intentionally separate from the invertebrate taxonomy used elsewhere on the site. Her section will develop around aquatic behaviour, habitat use, and verified keeper observations rather than forcing a turtle into a spider-oriented template."
      ],
      sources: [
        { label: "The Reptile Database — Mauremys reevesii", url: "https://reptile-database.reptarium.cz/Mauremys/reevesii" },
        { label: "U.S. Geological Survey — species profile", url: "https://nas.er.usgs.gov/queries/factsheet.aspx?SpeciesID=1228" }
      ],
      image: "sonja-mauremys-reevesii.jpg",
      alt: "Sonja, a Reeves’s turtle, looking toward the camera in dark water",
      intro: "Sonja is the Reeves’s turtle currently in my care and the only vertebrate in the collection. Her portrait keeps the surrounding water dark so the face and shell emerge gradually.",
      gallery: [
        { file: "sonja-close.jpg", alt: "Sonja lifting her head and forelegs toward the camera", caption: "Sonja up close · 2025" },
        { file: "sonja-wave.jpg", alt: "Sonja facing the camera with one forefoot raised", caption: "At the glass · 2025" },
        { file: "sonja-shore.jpg", alt: "Sonja resting at the planted shoreline of her enclosure", caption: "Shoreline habitat · 2025" }
      ],
      video: { id: "lEVuJhaAlNY", title: "Sonja’s new home", note: "A complete look at the home created for Sonja, the collection’s Reeves’s turtle." }
    },
    "bella-monocentropus-balfouri": {
      resident: "Bella",
      species: "Monocentropus balfouri",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Socotra, Yemen",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Monocentropus balfouri is an accepted theraphosid known from Socotra, Yemen, and is the type species of Monocentropus. A recent integrative revision retained the species in the genus while reorganising related taxa.",
        "Bella and Belinda have separate pages because they are separate animals, even though their species-level natural history is shared. Bella’s page foregrounds the more open blue-and-cream portrait and her own future Codex record."
      ],
      sources: [{ label: "World Spider Catalog — Monocentropus balfouri", url: "https://wsc.nmbe.ch/spec-data/44317" }],
      image: "bella-monocentropus-balfouri.jpg",
      alt: "Bella, a blue and cream Monocentropus balfouri tarantula",
      intro: "Bella is one of two Monocentropus balfouri currently in my care. Her profile uses the stronger open portrait, with blue legs and a pale carapace visible across the frame.",
      gallery: [
        { file: "bella-close.jpg", alt: "Close view of Bella showing her pale carapace and blue legs", caption: "Bella up close · 2024" },
        { file: "bella-retreat.jpg", alt: "Bella facing outward from a rounded webbed retreat", caption: "At the retreat · 2024" },
        { file: "bella-webbing.jpg", alt: "Bella resting on a dense layer of white webbing", caption: "Webbed enclosure · 2024" }
      ],
      video: { id: "fjac-dh_wAQ", title: "Discover Bella: Monocentropus balfouri", note: "A short individual introduction to Bella and her distinctive blue-and-cream colouring." }
    },
    "belinda-monocentropus-balfouri": {
      resident: "Belinda",
      species: "Monocentropus balfouri",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Socotra, Yemen",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Monocentropus balfouri is an accepted theraphosid known from Socotra, Yemen, and is the type species of Monocentropus. A recent integrative revision retained the species in the genus while reorganising related taxa.",
        "Belinda’s page remains distinct from Bella’s because individual history matters. Her current photographs and enclosure video document a more retreat-oriented presentation, and her eventual Codex summary will describe her record rather than duplicate Bella’s."
      ],
      sources: [{ label: "World Spider Catalog — Monocentropus balfouri", url: "https://wsc.nmbe.ch/spec-data/44317" }],
      image: "belinda-monocentropus-balfouri.jpg",
      alt: "Belinda, a Monocentropus balfouri tarantula, partly visible in her burrow",
      intro: "Belinda is the second Monocentropus balfouri currently in my care. Her available portrait is more secretive, showing her partly visible within the retreat.",
      video: { id: "ghR2QufL78U", title: "The science behind a vivarium: Belinda’s new setup", note: "A longer build and husbandry video centred on Belinda’s enclosure." }
    },
    "omothymus-violaceopes": {
      resident: "Current resident",
      species: "Omothymus violaceopes",
      group: "Tarantula",
      sex: "Confirmed male",
      family: "Theraphosidae",
      range: "Peninsular Malaysia and Singapore",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Omothymus violaceopes is an accepted theraphosid recorded from Peninsular Malaysia and Singapore. It was originally described under a different generic placement and has appeared in older literature and the hobby as Lampropelma violaceopes.",
        "The current profile follows Omothymus, the combination accepted by the World Spider Catalog. That naming history is worth preserving because older videos, labels, and care discussions may still use the former genus."
      ],
      sources: [{ label: "World Spider Catalog — genus Omothymus", url: "https://www.wsc.nmbe.ch/genus/5543" }],
      image: "omothymus-violaceopes.jpg",
      alt: "Full-body portrait of an Omothymus violaceopes tarantula on bark",
      intro: "This Omothymus violaceopes is part of the current collection. The profile opens with a clearer arboreal portrait that brings out the animal’s long legs and violet colour.",
      gallery: [
        { file: "violaceopes-full-body.jpg", alt: "Full-body view of Omothymus violaceopes on an arboreal bark surface", caption: "Full-body view · 2025" },
        { file: "violaceopes-colour.jpg", alt: "Close view of Omothymus violaceopes showing violet colour on the legs", caption: "Violet leg colour · 2025" },
        { file: "violaceopes-arboreal.jpg", alt: "Omothymus violaceopes positioned vertically on bark", caption: "Arboreal posture · 2024" }
      ],
      video: { id: "UPEjF670oIA", title: "Meet Omothymus violaceopes: The stunning blue tarantula", note: "A species-focused introduction to the Singapore blue tarantula." }
    },
    "clara-psalmopoeus-irminia": {
      resident: "Clara",
      species: "Psalmopoeus irminia",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Venezuela, Guyana and Brazil",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Psalmopoeus irminia is an accepted theraphosid described in 1994 and recorded from Venezuela, Guyana, and Brazil. The World Spider Catalog retains the species in Psalmopoeus and lists the original description alongside later taxonomic treatments.",
        "Clara’s profile pairs that verified range with a personal photographic record. Her foliage portrait is evidence of how this individual uses a structured enclosure, not a substitute for field data across the species’ range."
      ],
      sources: [{ label: "World Spider Catalog — Psalmopoeus irminia", url: "https://wsc.nmbe.ch/spec-data/44467/Psalmopoeus_irminia" }],
      image: "clara-psalmopoeus-irminia.jpg",
      alt: "Clara, a Psalmopoeus irminia tarantula, peering through green leaves",
      intro: "Clara is the Psalmopoeus irminia currently in my care. Her photograph is one of the most atmospheric in the collection, placing her face between dark foliage and soft green light.",
      gallery: [
        { file: "clara-climbing.jpg", alt: "Clara climbing vertically across bark inside the enclosure", caption: "Climbing posture · 2025" },
        { file: "clara-webbing.jpg", alt: "Clara standing at the entrance to a broad webbed retreat", caption: "At the webbed retreat · 2025" },
        { file: "clara-retreat.jpg", alt: "Clara partly concealed inside a narrow arboreal retreat", caption: "Inside the retreat · 2024" }
      ],
      video: { id: "F8HVJVy4PdE", title: "Meet Clara: The Venezuelan sun tiger", note: "A full introduction to Clara and Psalmopoeus irminia on the Introvertebrates channel." }
    },
    "psyttala-horrida": {
      resident: "Current colony",
      species: "Psyttala horrida",
      group: "Assassin bug",
      sex: "Mixed colony",
      family: "Reduviidae",
      range: "Africa",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Psyttala horrida is an African assassin bug in the family Reduviidae. A modern morphological study describes its eggs and nymphs and notes that all six recognised species of Psyttala are African generalist predators of insects and other arthropods.",
        "The same study addresses a common spelling problem: Psyttala is the original and correct genus spelling, while “Psytalla” is widely repeated in error. This profile uses Psyttala consistently and treats the group as a colony rather than inventing individual records."
      ],
      sources: [{ label: "Morphological study of Psyttala horrida eggs and nymphs", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9696875/" }],
      image: "psyttala-horrida.jpg",
      alt: "A Psyttala horrida assassin bug resting on vivid pink and green leaves",
      intro: "Psyttala horrida brings a different shape and scale to the current collection. The profile image places the dark assassin bug against vivid pink and green foliage.",
      gallery: [
        { file: "psyttala-ground.jpg", alt: "Adult Psyttala horrida moving across leaf litter", caption: "Adult on the enclosure floor · 2025" },
        { file: "psyttala-adult.jpg", alt: "Adult Psyttala horrida climbing beside green leaves and bark", caption: "Adult colour and form · 2024" },
        { file: "psyttala-nymph.jpg", alt: "Psyttala horrida nymph resting on green foliage", caption: "Nymph stage · 2024" }
      ],
      video: { id: "sr930b5ycrg", title: "Creating a beautiful assassin bug habitat", note: "The enclosure build and environmental thinking behind the assassin bugs in the collection." }
    },
    "pachnoda-marginata": {
      resident: "Current colony",
      species: "Pachnoda marginata",
      group: "Sun beetle",
      sex: "Mixed colony",
      family: "Scarabaeidae",
      range: "Africa",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Pachnoda marginata is a scarab beetle in the family Scarabaeidae, commonly called a sun beetle or marginated Congo chafer. GBIF’s backbone taxonomy retains the species under Pachnoda and records the original Drury authorship.",
        "The collection is represented as a colony because the images and future observations concern several beetles and their shared enclosure. Subspecies-level labels are intentionally omitted until the colony’s identification can be documented more precisely."
      ],
      sources: [{ label: "GBIF Backbone Taxonomy — Pachnoda marginata", url: "https://www.gbif.org/species/1081779" }],
      image: "pachnoda-marginata.jpg",
      alt: "Pachnoda marginata sun beetles clustered on a branch",
      intro: "Pachnoda marginata represents the beetles in the current collection. The profile photograph shows several individuals using the same branching structure.",
      gallery: [
        { file: "pachnoda-group.jpg", alt: "Several Pachnoda marginata beetles climbing together on dark wood", caption: "Colony group · 2024" },
        { file: "pachnoda-close.jpg", alt: "Close frontal view of a Pachnoda marginata beetle on wood", caption: "Head and pronotum detail · 2024" },
        { file: "pachnoda-pair.jpg", alt: "Pair of Pachnoda marginata beetles meeting on a branch", caption: "Pair on a branch · 2024" }
      ],
      video: { id: "o7Ja1Ro3jDo", title: "The beautiful lives of sun beetles", note: "A longer look at the sun beetles’ life cycle, behaviour, and enclosure." }
    },
    "siuzi-theraphosa-apophysis": {
      resident: "Siuzi",
      species: "Theraphosa apophysis",
      group: "Tarantula",
      sex: "Confirmed female",
      family: "Theraphosidae",
      range: "Colombia, Venezuela and Brazil",
      taxonomicStatus: "Accepted species",
      naturalHistory: [
        "Theraphosa apophysis is an accepted theraphosid recorded from Colombia, Venezuela, and Brazil. It was described in 1991 as Pseudotheraphosa apophysis and later transferred to Theraphosa.",
        "That taxonomic history explains why older sources may use a different genus. Siuzi’s profile adds a documented individual case study and feeding portrait while keeping those keeper observations separate from species-wide conclusions."
      ],
      sources: [{ label: "World Spider Catalog — Theraphosa apophysis", url: "https://wsc.nmbe.ch/spec-data/44582" }],
      image: "siuzi-theraphosa-apophysis.jpg",
      alt: "Siuzi, a Theraphosa apophysis tarantula, in a close feeding portrait",
      intro: "Siuzi is the Theraphosa apophysis currently in my care. Her current profile image is a close feeding portrait with warm substrate and retreat details around her.",
      gallery: [
        { file: "siuzi-face.jpg", alt: "Extreme close view of Siuzi’s face and mouthparts", caption: "Face detail · 2025" },
        { file: "siuzi-habitat.jpg", alt: "Siuzi resting among grasses and cork in her terrestrial enclosure", caption: "Habitat view · 2024" },
        { file: "siuzi-retreat.jpg", alt: "Siuzi facing outward from beneath a cork retreat", caption: "At the retreat · 2024" }
      ],
      video: { id: "f3f4iNm1e7k", title: "When mold grows on a tarantula: A case study with Siuzi", note: "A detailed, individual case study documenting Siuzi and the response to an unusual health concern." }
    }
  };

  const collectionStories = {
    "sabrina-brachypelma-hamorii": "Sabrina is the individual behind this profile. Her orange knee bands make her easy to recognise across the collection, while her own feeding and molt history remains distinct from published species-level information.",
    "ceratogyrus-darlingi": "This resident gives the Introvertebrates collection a living record of Ceratogyrus darlingi. The profile will continue to bring together verified species information, the introduction video, and observations recorded through the Codex.",
    "chilobrachys-fimbriatus": "This individual has produced the dense webbed retreat documented in the collection photography and rehousing video. Those records describe this animal’s behaviour in my care without turning one resident’s choices into universal care claims.",
    "chilobrachys-kaeng-krachan": "This is the individual kept under the hobby designation Chilobrachys sp. “Kaeng Krachan.” Its paludarium build, feeding records, and future photographs form a personal record while the profile remains transparent about the unresolved formal identity.",
    "elvira-chilobrachys-natanicharum": "Elvira is the individual behind this profile. Her collection record connects the recently described electric-blue species with a named resident whose feeding, molts, and development can be followed over time.",
    "ruby-chromatopelma-cyaneopubescens": "Ruby is one of the most visually distinctive residents in the collection. Her feeding-response video and Codex history give the profile an individual story alongside the accepted taxonomy and range of Chromatopelma cyaneopubescens.",
    "grammostola-pulchripes": "This resident represents Grammostola pulchripes in the current collection. The recognisable golden leg bands make the animal easy to follow visually, while the Codex separates personal observations from general species information.",
    "linothele-fallax": "This Linothele fallax broadens the collection beyond tarantulas. Its curtain-web spider identity, patterned abdomen, feeding video, and keeper record give the profile a different biological and visual character from the theraphosid residents.",
    "sonja-mauremys-reevesii": "Sonja is the only vertebrate in the current collection. Her profile follows her as an individual—from the home shown in the accompanying video to the measurements and observations selected from her Codex record—while keeping turtle biology separate from the spider profiles.",
    "bella-monocentropus-balfouri": "Bella is one of two Monocentropus balfouri in my care. Her record remains separate from Belinda’s so that photographs, feeding outcomes, molts, and future observations continue to describe the correct individual.",
    "belinda-monocentropus-balfouri": "Belinda has her own profile because a shared species does not mean a shared history. Her vivarium video and Codex record document her as an individual, independently from Bella’s photographs and observations.",
    "omothymus-violaceopes": "This resident represents Omothymus violaceopes in the current collection. The profile connects the species’ accepted modern name with an individual record that can grow through verified observations, photographs, and video.",
    "clara-psalmopoeus-irminia": "Clara is the individual behind this profile. Her foliage-rich enclosure photography and personal Codex record add a keeper’s view to the documented range and taxonomy of Psalmopoeus irminia.",
    "psyttala-horrida": "This assassin bug colony brings predatory insects into the collection. The profile follows the colony as a living group record, with habitat, feeding observations, and photography kept distinct from published species-level research.",
    "pachnoda-marginata": "This Pachnoda marginata colony represents beetles in the current collection. Its group photography and Codex history can document feeding and colony development while the profile expands into life cycle and natural-history research.",
    "siuzi-theraphosa-apophysis": "Siuzi is the individual behind this profile. Her feeding record and the documented health case on the Introvertebrates channel create a particularly detailed personal history that sits alongside, but does not replace, verified species information."
  };

  const root = document.querySelector("[data-current-profile]");
  const key = document.body.dataset.profile;
  const profile = profiles[key];
  if (!root || !profile) return;

  const namedResident = !profile.resident.startsWith("Current ");
  const title = namedResident ? profile.resident : profile.species;
  const subtitle = namedResident ? `Meet ${profile.resident}` : profile.group;
  const collectionHeading = namedResident ? `Meet ${profile.resident}.` : "In my care.";
  const relatedProfiles = Object.entries(profiles)
    .filter(([relatedKey]) => relatedKey !== key)
    .sort(([, first], [, second]) => {
      const firstScore = first.family === profile.family ? 0 : first.group === profile.group ? 1 : 2;
      const secondScore = second.family === profile.family ? 0 : second.group === profile.group ? 1 : 2;
      return firstScore - secondScore;
    })
    .slice(0, 3);
  const isSpider = profile.family === "Theraphosidae" || profile.family === "Dipluridae";
  const gallery = Array.isArray(profile.gallery) ? profile.gallery : [];

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
          <a href="../learn.html">Learn</a>
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
          <p class="eyebrow">Species profile · Current resident</p>
          <h1 id="profile-title"><i>${profile.species}</i></h1>
          <p class="common-name">${subtitle}</p>
          <p class="species-lede">${profile.intro}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#natural-history">Explore the species</a>
            <a class="button" href="#collection-record">${namedResident ? `Meet ${profile.resident}` : "Collection record"}</a>
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
        <div class="fact"><span class="fact-label">Family</span><span class="fact-value">${profile.family}</span></div>
        <div class="fact"><span class="fact-label">Native range</span><span class="fact-value">${profile.range}</span></div>
        <div class="fact"><span class="fact-label">Taxonomy</span><span class="fact-value">${profile.taxonomicStatus}</span></div>
        <div class="fact"><span class="fact-label">Sex</span><span class="fact-value">${profile.sex}</span></div>
      </section>

      <section class="profile-section species-shell" id="natural-history" aria-labelledby="natural-history-title">
        <header class="section-heading"><p class="section-kicker">In the wild</p><h2 id="natural-history-title">Natural history.</h2></header>
        <div class="section-copy">
          <h3>Taxonomy and range</h3>
          <p>${profile.naturalHistory[0]}</p>
          <h3>What the record can show</h3>
          ${profile.naturalHistory.slice(1).map((paragraph) => `<p>${paragraph}</p>`).join("")}
          <aside class="context-note">
            <strong>Research and keeper observations</strong>
            <p>Published taxonomy and distribution are kept separate from photographs, videos, and Codex records of this resident. That makes it clear which statements come from research and which describe an animal in my care.</p>
          </aside>
        </div>
      </section>

      <section class="profile-section species-shell" id="collection-record" aria-labelledby="collection-record-title">
        <header class="section-heading"><p class="section-kicker">In my care</p><h2 id="collection-record-title">${collectionHeading}</h2></header>
        <div class="section-copy">
          <p class="alma-intro">${collectionStories[key]}</p>
          ${gallery.length > 0 ? `
            <div class="photo-gallery" aria-label="Photographs of ${title}">
              ${gallery.map((photo) => `
                <figure class="photo-card">
                  <img src="../assets/species/${key}/${photo.file}" alt="${photo.alt}" width="1600" height="898" loading="lazy" decoding="async">
                  ${photo.caption ? `<figcaption>${photo.caption}</figcaption>` : ""}
                </figure>
              `).join("")}
            </div>
          ` : ""}
        </div>
      </section>

      <section class="profile-section species-shell profile-video-section" aria-labelledby="profile-video-title">
        <header class="section-heading"><p class="section-kicker">From the channel</p><h2 id="profile-video-title">Related viewing.</h2></header>
        <div class="section-copy">
          <article class="profile-video-card">
            <div class="profile-video-frame">
              <iframe src="https://www.youtube-nocookie.com/embed/${profile.video.id}" title="${profile.video.title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div class="profile-video-copy">
              <span class="profile-video-label">Introvertebrates on YouTube</span>
              <h3>${profile.video.title}</h3>
              <p>${profile.video.note}</p>
              <div class="profile-media-links">
                <a class="profile-video-link" href="https://www.youtube.com/watch?v=${profile.video.id}" target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">→</span></a>
                <a class="profile-video-link" href="https://www.instagram.com/introvertebrates_yt/" target="_blank" rel="noopener noreferrer">Photography &amp; reels on Instagram <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="profile-section species-shell" aria-labelledby="codex-title">
        <header class="section-heading"><p class="section-kicker">Personal observations</p><h2 id="codex-title">From the Codex.</h2></header>
        <div class="section-copy">
          <div class="codex-panel" data-codex-profile="${key}">
            <span class="codex-label">Introvertebrates Codex</span>
            <h3>${profile.resident} · keeper record</h3>
            <p class="codex-intro">A privacy-safe summary of this resident’s time in care, feeding outcomes, molts, and measurements. These are observations from the Introvertebrates collection, not species-wide averages.</p>
            <p class="codex-status" data-codex-status>Awaiting a privacy-reviewed Codex export. No invented statistics are shown.</p>
            <div class="codex-metrics" data-codex-metrics hidden></div>
            <p class="codex-privacy">Never published here: raw notes, record IDs, seller or breeder details, enclosure identifiers, local file paths, or exact private event dates.</p>
          </div>
        </div>
      </section>

      <section class="profile-section species-shell" aria-labelledby="related-title">
        <header class="section-heading"><p class="section-kicker">Continue exploring</p><h2 id="related-title">Related profiles.</h2></header>
        <div class="section-copy">
          <div class="related-profile-grid">
            ${relatedProfiles.map(([relatedKey, related]) => `
              <a class="related-profile-card" href="./${relatedKey}.html">
                <img src="../assets/collection/${related.image}" alt="" width="640" height="360" loading="lazy" decoding="async">
                <span class="related-profile-copy">
                  <strong>${related.resident.startsWith("Current ") ? related.species : related.resident}</strong>
                  <i>${related.species}</i>
                </span>
              </a>
            `).join("")}
          </div>
          <div class="profile-resource-links" aria-label="Continue learning">
            <a class="button" href="../research.html">Browse research updates</a>
            <a class="button" href="../learn.html">Visit the Learn hub</a>
            ${isSpider ? `<a class="button" href="../spider-anatomy.html">Spider anatomy</a><a class="button" href="../spider-facts.html">Amazing spider facts</a><a class="button" href="../spider-health.html">Health &amp; husbandry</a>` : ""}
          </div>
        </div>
      </section>

      <section class="profile-section species-shell" id="sources" aria-labelledby="sources-title">
        <header class="section-heading"><p class="section-kicker">Read further</p><h2 id="sources-title">Sources.</h2></header>
        <div class="section-copy">
          <ul class="source-list">
            ${profile.sources.map((source) => `<li><strong>${source.label}</strong><a href="${source.url}" target="_blank" rel="noopener noreferrer">View the source</a>.</li>`).join("")}
          </ul>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner species-shell">
        <span>© 2026 Introvertebrates</span>
        <nav class="footer-links" aria-label="Footer navigation">
          <a href="../index.html">Home</a><a href="../collection.html">Collection</a><a href="../learn.html">Learn</a><a href="../research.html">Research</a><a href="https://www.youtube.com/@Introvertebrates" target="_blank" rel="noopener noreferrer">YouTube</a><a href="https://www.instagram.com/introvertebrates_yt/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:erlend@introvertebrates.com">Contact</a>
        </nav>
      </div>
    </footer>
  `;

  const codexPanel = root.querySelector("[data-codex-profile]");
  const statusElement = codexPanel?.querySelector("[data-codex-status]");
  const metricsElement = codexPanel?.querySelector("[data-codex-metrics]");
  if (codexPanel && statusElement && metricsElement) {
    const renderMetric = (metric) => {
      const item = document.createElement("div");
      item.className = "codex-metric";
      item.innerHTML = `<span class="codex-metric-label"></span><strong class="codex-metric-value"></strong>${metric.detail ? '<span class="codex-metric-detail"></span>' : ""}`;
      item.querySelector(".codex-metric-label").textContent = metric.label;
      item.querySelector(".codex-metric-value").textContent = metric.value;
      const detail = item.querySelector(".codex-metric-detail");
      if (detail) detail.textContent = metric.detail;
      return item;
    };

    fetch("../assets/data/codex-public.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Public Codex data is unavailable.");
        return response.json();
      })
      .then((data) => {
        const codexProfile = data?.profiles?.[key];
        if (!codexProfile || codexProfile.status !== "ready" || !Array.isArray(codexProfile.metrics) || codexProfile.metrics.length === 0) return;
        metricsElement.replaceChildren(...codexProfile.metrics.map(renderMetric));
        metricsElement.hidden = false;
        const sampleText = `${codexProfile.sampleSize} Codex record${codexProfile.sampleSize === 1 ? "" : "s"}`;
        const updated = data.generatedAt ? new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(data.generatedAt)) : null;
        statusElement.textContent = updated ? `Privacy-reviewed snapshot · ${sampleText} · updated ${updated}.` : `Privacy-reviewed snapshot · ${sampleText}.`;
      })
      .catch(() => {
        // Keep the honest fallback already present in the page.
      });
  }
})();
