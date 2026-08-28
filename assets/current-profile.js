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
      sources: [
        { label: "World Spider Catalog — Brachypelma hamorii", url: "https://wsc.nmbe.ch/spec-data/43881" },
        { label: "Biodiversity Data Journal — conservation profile, habitat, and ecology", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6858399/" }
      ],
      image: "sabrina-brachypelma-hamorii.jpg",
      alt: "Sabrina, a Brachypelma hamorii tarantula with vivid orange knee markings",
      intro: "Sabrina is the Brachypelma hamorii currently in my care. Her collection portrait is built around the vivid orange knee markings that make her immediately recognisable.",
      gallery: [
        { file: "sabrina-close.jpg", alt: "Close portrait of Sabrina showing her eyes, mouthparts, and orange knee markings", caption: "Face and knee markings · archive portrait" },
        { file: "sabrina-habitat.jpg", alt: "Sabrina positioned among wood and dry enclosure planting", caption: "Sabrina in her habitat · 2026" },
        { file: "sabrina-retreat.jpg", alt: "Sabrina resting at the curved entrance to her retreat", caption: "At the retreat · 2024" }
      ],
      video: { id: "IXY2w7nUmoA", title: "Meet Sabrina: My Mexican red-knee tarantula", note: "A short introduction to Sabrina and the markings that make Brachypelma hamorii so recognisable." }
    },
    "ceratogyrus-darlingi": {
      resident: "Gunnar",
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
      sources: [
        { label: "World Spider Catalog — Ceratogyrus darlingi", url: "https://wsc.nmbe.ch/spec-data/43902" },
        { label: "Koedoe — revision and natural history of Ceratogyrus", url: "https://koedoe.co.za/index.php/koedoe/article/view/422" }
      ],
      image: "ceratogyrus-darlingi.jpg",
      alt: "Gunnar, a Ceratogyrus darlingi tarantula, watching from the entrance to his webbed retreat",
      intro: "Gunnar is the Ceratogyrus darlingi currently in my care. His updated portrait brings the viewer level with the entrance to his webbed retreat.",
      gallery: [
        { file: "darlingi-retreat.jpg", alt: "Ceratogyrus darlingi partly visible within a webbed wooden retreat", caption: "Inside the retreat · 2025" },
        { file: "darlingi-overhead.jpg", alt: "Overhead view of Ceratogyrus darlingi on textured bark", caption: "Dorsal view · 2025" },
        { file: "darlingi-terrestrial.jpg", alt: "Ceratogyrus darlingi walking across pale sandy substrate", caption: "Terrestrial enclosure · 2025" }
      ],
      video: { id: "WvyBlNpTxQI", title: "Introducing Gunnar, my Ceratogyrus darlingi", note: "A closer introduction to Gunnar and his place in the Introvertebrates collection." }
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
      sources: [
        { label: "World Spider Catalog — Chilobrachys fimbriatus", url: "https://wsc.nmbe.ch/species/37298/Chilobrachys_fimbriatus" },
        { label: "Frontiers in Arachnid Science — distribution and natural history of Chilobrachys", url: "https://www.frontiersin.org/journals/arachnid-science/articles/10.3389/frchs.2025.1598438/full" }
      ],
      image: "chilobrachys-fimbriatus.jpg",
      alt: "Chilobrachys fimbriatus facing the camera at the entrance to its webbed retreat",
      intro: "This Chilobrachys fimbriatus is part of the current collection. Its updated portrait shows the whole animal at the entrance to its dense, silk-lined retreat.",
      gallery: [
        { file: "fimbriatus-webbing.jpg", alt: "Chilobrachys fimbriatus visible through dense white webbing", caption: "Dense web structure · 2025" },
        { file: "fimbriatus-retreat.jpg", alt: "Chilobrachys fimbriatus partly concealed among leaves and substrate", caption: "At the retreat entrance · 2025" },
        { file: "fimbriatus-detail.jpg", alt: "Chilobrachys fimbriatus holding prey within layered white webbing", caption: "Prey and layered webbing · 2025" }
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
      sources: [
        { label: "World Spider Catalog — genus Chilobrachys", url: "https://www.wsc.nmbe.ch/genus-catalog/3515/Chilobrachys" },
        { label: "Frontiers in Arachnid Science — distribution and natural history of Chilobrachys", url: "https://www.frontiersin.org/journals/arachnid-science/articles/10.3389/frchs.2025.1598438/full" }
      ],
      image: "chilobrachys-kaeng-krachan.jpg",
      alt: "Chilobrachys sp. Kaeng Krachan standing across dense enclosure webbing",
      intro: "This Chilobrachys sp. “Kaeng Krachan” is part of the current collection. The portrait places the animal within the dense sheet webbing that turns the enclosure into a sensitive vibration network.",
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
        { file: "elvira-blue-detail.jpg", alt: "Close portrait of Elvira showing violet-blue structural colour on her raised legs", caption: "Electric-blue detail · close view" },
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
      sources: [
        { label: "World Spider Catalog — Chromatopelma cyaneopubescens", url: "https://www.wsc.nmbe.ch/spec-data/43941" },
        { label: "Anartia — distribution and habitat associations of Chromatopelma cyaneopubescens", url: "https://produccioncientificaluz.org/index.php/anartia/article/download/41442/47823?inline=1" }
      ],
      image: "ruby-chromatopelma-cyaneopubescens.jpg",
      alt: "Ruby, a Chromatopelma cyaneopubescens tarantula showing cobalt-blue legs and an orange abdomen",
      intro: "Ruby is the Chromatopelma cyaneopubescens currently in my care. Her portrait brings together the species’ blue-green legs, warm carapace, and dense surface detail.",
      gallery: [
        { file: "ruby-feeding.jpg", alt: "Ruby feeding on the enclosure surface with blue legs and an orange abdomen visible", caption: "Feeding response · 2026" },
        { file: "ruby-colour.jpg", alt: "Close dorsal view of Ruby showing blue legs and a warm orange abdomen", caption: "Colour and texture · 2025" },
        { file: "ruby-full-body.jpg", alt: "Full-body view of Ruby standing on webbed substrate", caption: "Full-body view · 2025" }
      ],
      video: { id: "SYVBvfz9fh8", title: "Ruby’s best strikes since day one", note: "A fast collection of Ruby’s feeding responses, presented as an Introvertebrates Short." }
    },
    "grammostola-pulchripes": {
      resident: "Runa",
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
      sources: [
        { label: "World Spider Catalog — Grammostola pulchripes", url: "https://wsc.nmbe.ch/spec-data/44063/Grammostola_pulchripes" },
        { label: "Journal of Natural History — Grammostola distribution and habitats in Argentina", url: "https://ri.conicet.gov.ar/bitstream/handle/11336/7551/CONICET_Digital_Nro.7610_G.pdf?sequence=8" }
      ],
      image: "grammostola-pulchripes.jpg",
      alt: "Grammostola pulchripes showing its golden knee stripes",
      intro: "Runa is the Grammostola pulchripes currently in my care. Her portrait is centred on the strong golden knee bands and full-body silhouette.",
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
      sources: [
        { label: "World Spider Catalog — genus Linothele", url: "https://www.wsc.nmbe.ch/genus-catalog/991/Linothele" },
        { label: "Taxonomy — habitat and natural history of Linothele", url: "https://www.mdpi.com/2813-3323/1/3/10" },
        { label: "ACS Omega — material properties of the Linothele fallax web", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8672351/" }
      ],
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
      alt: "Sonja, a Reeves’s turtle, lifting her head and forelegs toward the camera",
      intro: "Sonja is the Reeves’s turtle currently in my care and the only vertebrate in the collection. Her portrait shows the striped head, expressive posture, and strong forelimbs that make her such a distinctive resident.",
      gallery: [
        { file: "sonja-close.jpg", alt: "Sonja lifting her head and forelegs toward the camera", caption: "Sonja up close · 2025" },
        { file: "sonja-wave.jpg", alt: "Underwater side profile of Sonja resting above dark aquatic wood", caption: "Underwater side profile · 2025" },
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
      sources: [
        { label: "World Spider Catalog — Monocentropus balfouri", url: "https://wsc.nmbe.ch/spec-data/44317" },
        { label: "ZooKeys — integrative revision of Monocentropus and Socotran habitat", url: "https://www.utupub.fi/server/api/core/bitstreams/4830c6e0-07a8-40bd-8c91-e7e034e76598/content" }
      ],
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
      sources: [
        { label: "World Spider Catalog — Monocentropus balfouri", url: "https://wsc.nmbe.ch/spec-data/44317" },
        { label: "ZooKeys — integrative revision of Monocentropus and Socotran habitat", url: "https://www.utupub.fi/server/api/core/bitstreams/4830c6e0-07a8-40bd-8c91-e7e034e76598/content" }
      ],
      image: "belinda-monocentropus-balfouri.jpg",
      alt: "Close portrait of Belinda, a Monocentropus balfouri tarantula, showing blue legs and cream markings among webbed cork",
      intro: "Belinda is the second Monocentropus balfouri currently in my care. Her updated portrait clearly shows her blue and cream colouring across webbed cork.",
      video: { id: "ghR2QufL78U", title: "The science behind a vivarium: Belinda’s new setup", note: "A longer build and husbandry video centred on Belinda’s enclosure." }
    },
    "omothymus-violaceopes": {
      resident: "Orion",
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
      sources: [
        { label: "World Spider Catalog — genus Omothymus", url: "https://www.wsc.nmbe.ch/genus/5543" },
        { label: "Nature in Singapore — Singapore blue tarantula habitat record", url: "https://lkcnhm.nus.edu.sg/wp-content/uploads/sites/10/2023/01/NIS-2023-0008.pdf" }
      ],
      image: "omothymus-violaceopes.jpg",
      alt: "Orion, an Omothymus violaceopes tarantula, standing vertically on bark",
      intro: "Orion is the Omothymus violaceopes currently in my care. His profile opens with an arboreal portrait that brings out his long legs and violet colour.",
      gallery: [
        { file: "violaceopes-full-body.jpg", alt: "Macro view of Orion showing violet hairs and the eye cluster", caption: "Eyes and violet colour · 2025" },
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
      alt: "Adult Psyttala horrida assassin bug moving across the enclosure floor",
      intro: "Psyttala horrida brings a different shape and scale to the current collection. The profile opens with an adult moving across the enclosure floor, while the gallery compares adult colour, foliage use, and the nymph stage.",
      gallery: [
        { file: "psyttala-portrait.jpg", alt: "Close dorsal portrait of adult Psyttala horrida showing black wings, red legs, and thoracic spines", caption: "Adult colour and armour · archive portrait" },
        { file: "psyttala-foliage.jpg", alt: "Adult Psyttala horrida climbing across green foliage", caption: "Adult among foliage · archive portrait" },
        { file: "psyttala-nymph.jpg", alt: "Orange and black Psyttala horrida nymph standing on bark", caption: "Nymph stage · 2025" }
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
        "That taxonomic history explains why older sources may use a different genus. Siuzi’s profile adds a documented individual case study and close portrait while keeping those keeper observations separate from species-wide conclusions."
      ],
      sources: [
        { label: "World Spider Catalog — Theraphosa apophysis", url: "https://wsc.nmbe.ch/spec-data/44582" },
        { label: "Ecology and Evolution — natural orientation and climbing observations in tarantulas", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13106993/" }
      ],
      image: "siuzi-theraphosa-apophysis.jpg",
      alt: "Siuzi, a Theraphosa apophysis tarantula, moving among grass and cork in her enclosure",
      intro: "Siuzi is the Theraphosa apophysis currently in my care. Her updated portrait shows her moving through a naturalistic enclosure of cork and grass.",
      gallery: [
        { file: "siuzi-face.jpg", alt: "Extreme close view of Siuzi’s face and mouthparts", caption: "Face detail · 2025" },
        { file: "siuzi-habitat.jpg", alt: "Siuzi holding a large roach after a feeding response", caption: "Feeding response · 2025" },
        { file: "siuzi-retreat.jpg", alt: "Siuzi facing outward from beneath a cork retreat", caption: "At the retreat · 2024" }
      ],
      video: { id: "f3f4iNm1e7k", title: "When mold grows on a tarantula: A case study with Siuzi", note: "A detailed, individual case study documenting Siuzi and the response to an unusual health concern." }
    }
  };

  const fieldGuides = {
    "sabrina-brachypelma-hamorii": {
      lifestyle: "A ground-dwelling tarantula associated with terrestrial retreats in seasonally dry parts of western Mexico. Shelter and substrate are central to how the animal uses its space.",
      standout: "The orange bands across the leg joints are the most immediate visual cue. The abdomen also carries defensive urticating hairs, so observation is safer than handling.",
      inCare: "Sabrina is given deep substrate, a secure retreat, and a dry surface with access to water. Her own feeding and molt records appear separately below."
    },
    "ceratogyrus-darlingi": {
      lifestyle: "A terrestrial southern African tarantula that uses a silk-lined retreat and can reshape the ground around it. The profile photographs show this resident using both shelter and open substrate.",
      standout: "Ceratogyrus is known for the horn-like structure on the carapace. It is an unusual feature among tarantulas and a useful starting point for comparing African theraphosids.",
      inCare: "This confirmed male is kept for observation rather than interaction, with a retreat and enough substrate to build around it. Individual behaviour is recorded without treating it as universal."
    },
    "chilobrachys-fimbriatus": {
      lifestyle: "An Indian, retreat-oriented tarantula that spends much of its time in a burrow or behind dense silk. Its webbing can join substrate, leaves, and enclosure furniture into one structure.",
      standout: "The web is part of the animal's living space, not decoration. Watching how entrances and silk routes change can reveal more than a brief open view of the spider.",
      inCare: "This resident has produced the layered webbed retreat shown here. Deep substrate, anchor points, and minimal disturbance let that structure remain intact."
    },
    "chilobrachys-kaeng-krachan": {
      lifestyle: "This is a hobby locality form rather than a formally described species. The resident is strongly retreat-oriented and has built a broad web sheet around its doorway in the collection.",
      standout: "The uncertainty is scientifically important: an attractive hobby name is not the same as a published species description. The page therefore separates verified genus information from observations of this individual.",
      inCare: "The paludarium, web sheet, and feeding doorway are documented as this animal's record. Precise wild range and species-wide care claims are intentionally avoided."
    },
    "elvira-chilobrachys-natanicharum": {
      lifestyle: "A recently described Thai tarantula associated with retreat-based life. Elvira is most often photographed at the boundary between darkness, silk, and the entrance to her shelter.",
      standout: "The saturated electric-blue colour is structural: microscopic features affect how light is reflected. Colour is striking, but formal identification still depends on the published description.",
      inCare: "Elvira has a deep, secure retreat with web anchor points. Her personal molt and feeding history is drawn from the Codex rather than inferred from the species name."
    },
    "ruby-chromatopelma-cyaneopubescens": {
      lifestyle: "A terrestrial Venezuelan tarantula notable for laying extensive silk across the surface around its shelter. The species comes from a comparatively dry, exposed landscape.",
      standout: "Blue-green legs, a warm carapace, and an orange abdomen create one of the collection's strongest colour combinations. Ruby's photographs also make the surface webbing easy to see.",
      inCare: "Ruby's enclosure prioritises ventilation, a dry upper layer, a retreat, and water. Feeding responses shown in video are Ruby's own behaviour, not a promise about every individual."
    },
    "grammostola-pulchripes": {
      lifestyle: "A terrestrial tarantula from southern South America that uses ground-level shelter and may excavate around a retreat. Its heavy build suits a substrate-focused enclosure.",
      standout: "Pale golden bands on the legs give the Chaco golden-knee its familiar common name. The markings remain readable from both overhead and lower viewing angles.",
      inCare: "This confirmed female has deep substrate, a stable hide, and water. The profile distinguishes routine collection observations from broader published information."
    },
    "linothele-fallax": {
      lifestyle: "A South American curtain-web spider in Dipluridae, not a tarantula. It builds dense sheet and funnel-like silk that links a retreat to the surrounding hunting surface.",
      standout: "The orange carapace, patterned abdomen, and long spinnerets make the animal visually distinct. Its web architecture is an equally important part of the profile.",
      inCare: "The enclosure provides a dark retreat and many points for silk attachment. Feeding is observed at the web rather than by exposing or handling the resident."
    },
    "sonja-mauremys-reevesii": {
      lifestyle: "Reeves's turtle is a freshwater turtle from East Asia. It moves between water and a dry basking area, so swimming, thermoregulation, and access to ultraviolet light all shape daily life.",
      standout: "The three raised keels on the shell are especially noticeable in younger animals. Facial markings and shell texture make Sonja easy to recognise across her photographs.",
      inCare: "Sonja's record centres on clean water, a fully accessible basking area, heat and UVB, varied feeding, and tracked growth. She is the collection's only vertebrate."
    },
    "bella-monocentropus-balfouri": {
      lifestyle: "A terrestrial, burrow- and web-associated tarantula from the island of Socotra. Silk can connect the retreat, substrate, and nearby structures into a broad working area.",
      standout: "Blue legs, a pale carapace, and a darker abdomen give the species a distinctive high-contrast appearance. Bella and Belinda still have separate individual histories.",
      inCare: "Bella's photographs and Codex data belong only to Bella. A secure retreat, deep substrate, and web anchor points allow her enclosure to develop around her own choices."
    },
    "belinda-monocentropus-balfouri": {
      lifestyle: "A terrestrial, burrow- and web-associated tarantula from the island of Socotra. Silk can connect the retreat, substrate, and nearby structures into a broad working area.",
      standout: "The blue-and-cream colour pattern is shared at species level, but posture, web placement, feeding, and molt history remain individual. That is why Belinda has her own page.",
      inCare: "Belinda's vivarium and Codex record are kept separate from Bella's. The page can grow with better portraits without merging the two animals' histories."
    },
    "omothymus-violaceopes": {
      lifestyle: "An arboreal Southeast Asian tarantula associated with elevated retreats in trees. A vertical profile, cover, and access routes matter more than open floor area alone.",
      standout: "Violet-blue tones on the legs are most apparent under directional light. The animal's position inside a dark retreat can make colour and scale difficult to judge from a single photograph.",
      inCare: "This confirmed male is provided with vertical cork and a concealed elevated retreat. Observations are made from outside the enclosure with disturbance kept low."
    },
    "clara-psalmopoeus-irminia": {
      lifestyle: "An arboreal Venezuelan tarantula that uses bark crevices, hollows, and silk-lined elevated retreats. Its body shape and movement suit climbing and concealed routes.",
      standout: "Orange markings on a dark body break up the silhouette. Clara's foliage-rich photographs show how quickly an arboreal spider can disappear into layered cover.",
      inCare: "Clara has vertical structure, a secure retreat, and foliage for cover. Her feeding and molt observations are presented as an individual record below."
    },
    "psyttala-horrida": {
      lifestyle: "A predatory assassin bug from tropical Africa. Like other reduviids, it uses a piercing-sucking rostrum to subdue prey and take in liquefied tissues.",
      standout: "The rough, sculpted body and long legs make the insects look almost plant-like at rest. Their predatory mouthparts also mean they should not be handled casually.",
      inCare: "The colony includes multiple sexes and life stages. Ventilation, climbing structure, secure containment, and carefully sized live prey are tracked at colony level."
    },
    "pachnoda-marginata": {
      lifestyle: "A flower chafer whose adult and larval lives use very different resources. Adults visit fruit and flowers, while the grubs develop within rich, decomposing organic material.",
      standout: "The patterned wing covers are the obvious feature, but the complete life cycle—from buried grub to active adult—makes a colony especially useful for observation.",
      inCare: "This mixed colony is tracked as a group. Adult feeding, substrate condition, larvae, pupation, and emerging beetles can all become part of the public record."
    },
    "siuzi-theraphosa-apophysis": {
      lifestyle: "A very large terrestrial tarantula from northern South America that uses ground shelter and excavated retreats. Its scale makes secure footing and deep substrate especially important.",
      standout: "Young animals can show pinkish tones on the legs, while the adult form becomes darker and heavier. Size is impressive, but the close portraits reveal equally distinctive hairs and mouthparts.",
      inCare: "Siuzi has a spacious terrestrial setup, deep substrate, a retreat, water, and close condition monitoring. Her documented health case remains an individual case study, not a universal diagnosis."
    }
  };

  const naturalHistorySections = {
    "sabrina-brachypelma-hamorii": {
      taxonomy: "The World Spider Catalog treats Brachypelma hamorii as an accepted Mexican species in the family Theraphosidae. Its taxonomic history matters because animals now identified as B. hamorii were frequently presented under the name B. smithi in older literature and in the hobby.",
      shelter: "Mexican red-knee field records describe terrestrial spiders using deep, silk-lined burrows and natural cavities in seasonally dry country. The retreat buffers heat and moisture and gives the spider a secure daytime refuge; activity is concentrated around the entrance and during lower-light periods. Older ecological accounts do not always separate B. hamorii cleanly from B. smithi, so that limitation should travel with the claim.",
      feeding: "This is primarily a sit-and-wait predator. Vibrations and close-range sensory cues bring the spider out to seize passing arthropods, which are subdued with the chelicerae and venom before external digestion. Sabrina's feeding records show one animal in captivity and are kept separate from statements about the wild diet.",
      defence: "The first response is often stillness or retreat, but the abdomen also carries urticating hairs that can be brushed into the air. Those hairs can irritate skin and eyes; the calm appearance associated with the species is not a reason to handle it.",
      inference: "The natural-history record supports a low terrestrial enclosure with diggable substrate, a stable retreat, water, and secure footing. Sabrina's actual use of that space remains the final check: a setup should respond to the individual rather than to a care-sheet stereotype."
    },
    "ceratogyrus-darlingi": {
      taxonomy: "Ceratogyrus darlingi is an accepted theraphosid species from southern Africa and the type species of Ceratogyrus. The genus was revised with field notes on its natural history, while the current catalogued name preserves a long history of older combinations and interpretations.",
      shelter: "This is a terrestrial, burrow-associated spider. A silk-lined earthen retreat forms the centre of its activity, giving shelter from surface conditions and a protected place for moulting and feeding. The horn-like structure on the carapace is distinctive, but its function should not be presented as settled fact.",
      feeding: "Prey is taken close to the retreat by rapid ambush. Arthropods that cross the silk and disturbed ground around the entrance provide vibration cues; food may then be pulled back into cover. Detailed species-specific diet data remain limited, so broad claims about unusual prey are avoided here.",
      defence: "African theraphosids do not have the New World urticating-hair defence. Escape into the retreat, speed, and a defensive posture are more relevant responses, all of which make observation from outside a secure enclosure the appropriate way to study the animal.",
      inference: "A deep, compactable substrate and an anchored starter retreat let the resident construct rather than merely occupy a hide. The collection photographs can document how the entrance changes without repeatedly opening the structure."
    },
    "chilobrachys-fimbriatus": {
      taxonomy: "Chilobrachys fimbriatus is an accepted Indian theraphosid described by Pocock in 1899. Modern summaries place it in western India, including Maharashtra and the Western Ghats, while the World Spider Catalog records the taxonomic history behind the current name.",
      shelter: "Field accounts describe burrows in forest and scrub, lined with a thick layer of silk. The web can extend beyond the tunnel into a broad sheet that joins soil, leaves, and roots, so the visible web is part shelter, part sensory surface, and part route back to safety.",
      feeding: "The spider waits within or near the retreat and responds to vibrations made by passing prey. The strike is short and fast, after which the prey can be taken deeper into the webbed structure. This is ambush feeding, not evidence that the animal needs to be exposed in order to eat.",
      defence: "Chilobrachys lacks urticating hairs and relies more heavily on concealment, speed, and defensive use of the front legs and chelicerae. Dense silk also gives early warning of disturbance, which is another reason to leave an established retreat intact.",
      inference: "Deep substrate, a dark starter cavity, web anchor points, and careful moisture management reflect the retreat-based natural history. Good ventilation and minimal disturbance matter as much as any single humidity number."
    },
    "chilobrachys-kaeng-krachan": {
      taxonomy: "Chilobrachys sp. ‘Kaeng Krachan’ is an informal hobby designation, not a formally described species. The label suggests an association with western Thailand, but no published diagnosis currently links this animal securely to a named species, so exact range and conservation claims would be misleading.",
      shelter: "The safest biological comparison is with the genus Chilobrachys, whose members commonly use silk-lined burrows or tree cavities and extend silk around the entrance. This resident's broad web sheet and doorway are direct collection observations, not proof that every animal sold under the same label behaves identically.",
      feeding: "The individual waits at the webbed entrance and responds to vibrations reaching the silk. That makes the doorway both shelter and hunting position. Until the identity is resolved, feeding ecology should be described at genus level and through clearly labelled observations of this resident.",
      defence: "Like other Asian Chilobrachys, the animal has no urticating-hair defence. Concealment, speed, and defensive posturing make hands-off observation essential, while the silk provides an early-warning system around the retreat.",
      inference: "The honest care approach is to provide depth, cover, anchor points, ventilation, and a moisture gradient, then document what the animal builds. The unresolved name is a reason for more caution, not for filling the gap with confident hobby lore."
    },
    "elvira-chilobrachys-natanicharum": {
      taxonomy: "Chilobrachys natanicharum was formally described from Thailand in 2023 after being known in the trade as an electric-blue form. The original ZooKeys paper provides the diagnosis, locality data, and taxonomic baseline that the hobby name previously lacked.",
      shelter: "The type series came from mangrove habitat and the authors also discuss Chilobrachys using terrestrial burrows and cavities in trees. Elvira's life at the boundary between a dark retreat, silk, and the entrance is consistent with a spider built around concealment rather than constant display.",
      feeding: "Published species-specific diet records are still sparse. The most defensible account is a retreat-based ambush predator taking arthropods that enter its vibration field; Elvira's own strikes and feeding outcomes remain individual Codex observations.",
      defence: "The celebrated blue is structural colour produced by microscopic surface architecture rather than a simple blue pigment. Defence is a separate story: this Asian species lacks urticating hairs and can rely on cover, speed, and a defensive posture when escape is limited.",
      inference: "A secure retreat spanning substrate and vertical structure, with abundant silk anchors and good airflow, lets the animal choose how terrestrial or elevated its shelter becomes. The enclosure should make that choice possible without forcing visibility."
    },
    "ruby-chromatopelma-cyaneopubescens": {
      taxonomy: "Chromatopelma cyaneopubescens is a Venezuelan endemic and the only accepted species in its genus. Recent work using verified observations has expanded the known distribution beyond the best-known Paraguaná records while emphasizing how much of the published biology still comes from captivity.",
      shelter: "Wild observations associate the species with dry, open scrub and silk shelters at the bases of vegetation, rocks, or shallow cavities. It spreads silk far beyond a single hole, producing a connected surface that combines cover, pathways, and vibration sensing.",
      feeding: "Ruby hunts from that silk-rich working area. Passing arthropods can be detected before contact, followed by a rapid strike and retreat with the prey. Her feeding videos document a particularly bold individual response; they are not a species-wide feeding schedule.",
      defence: "Bright blue-green legs and the warm orange abdomen are visual signals to us, not evidence that the spider is inviting contact. The animal can retreat rapidly and carries urticating abdominal hairs, so enclosure access should keep hands and faces away from both spider and loose substrate.",
      inference: "Strong ventilation, a dry upper surface, access to water, a starter refuge, and many web anchors fit the published habitat associations without trying to recreate a desert as a uniformly dry box. Ruby's web placement shows whether the structure is working."
    },
    "grammostola-pulchripes": {
      taxonomy: "Grammostola pulchripes is an accepted South American theraphosid recorded from Brazil, Paraguay, and Argentina. Regional taxonomic work places Argentine records in comparatively humid landscapes including wet Chaco, eastern Espinal, and northern Yungas, a useful correction to overly simple ‘dry grassland’ summaries.",
      shelter: "This heavy terrestrial spider uses ground-level cover and can excavate around a natural cavity or prepared retreat. The shelter moderates surface conditions and becomes the centre of a relatively small activity area, especially outside mating dispersal.",
      feeding: "The basic strategy is opportunistic ambush of terrestrial arthropods. Long pauses between visible events are normal for a sit-and-wait predator, and captive appetite can change around premoult, season, temperature, and individual condition.",
      defence: "Retreat and stillness are important defences, backed by urticating abdominal hairs when the animal is persistently disturbed. The familiar golden bands make the spider easy to recognise but say nothing about whether handling is safe or useful.",
      inference: "A low enclosure with generous substrate, a stable hide, water, and a moisture gradient is more faithful to the ecological range than a rigid humidity target. The resident's digging, closure of the retreat, and feeding history provide better feedback."
    },
    "linothele-fallax": {
      taxonomy: "Linothele fallax is a South American mygalomorph in Dipluridae rather than Theraphosidae. It was originally described in Diplura and later transferred to Linothele, a genus whose species occupy a remarkable range of ground, bank, rock-wall, and elevated forest microhabitats.",
      shelter: "L. fallax has been recorded from natural crevices near ground level and from burrows. Long spinnerets lay dense silk into a curtain or sheet leading back to the refuge, turning a small hiding place into a much larger vibration-sensitive hunting surface.",
      feeding: "The spider waits where signals from the curtain web converge, then rushes onto the sheet to capture arthropods. Food can be taken back to the silk-lined refuge. Research on its web material also shows why the silk itself deserves attention as a biological structure, not simply scenery.",
      defence: "This is a fast mygalomorph without the urticating-hair defence of many New World tarantulas. Retreat, speed, and venom used for prey make a secure enclosure and hands-off observation especially important.",
      inference: "A dark crevice, deep substrate, and multiple attachment points allow the web to develop in three dimensions. Feeding and maintenance can then take place at the web edge instead of dismantling the animal's sensory architecture."
    },
    "bella-monocentropus-balfouri": {
      taxonomy: "Monocentropus balfouri is an accepted theraphosid endemic to Socotra, Yemen. A recent integrative revision retained the species in Monocentropus and documented its island habitat and burrows while reorganising related Arabian and African taxa.",
      shelter: "Field photographs and collection experience both place the species around silk-lined ground burrows. The web can spread through nearby soil and structure, joining several entrances into a concealed working area that is far larger than the visible spider.",
      feeding: "Arthropods are taken by ambush at or beyond the retreat. The species is famous in captivity for tolerating group living and sometimes feeding near conspecifics, but the frequency and organisation of social behaviour in the wild remain poorly quantified and should not be overstated.",
      defence: "There are no urticating hairs. Concealment, speed, and defensive posturing are more relevant, while the contrasting blue-and-cream colour is most obvious only when the animal leaves cover.",
      inference: "Bella's individual enclosure needs depth, an anchored refuge, water, and room for silk architecture. Her page deliberately avoids turning reports from communal captive groups into assumptions about this single resident."
    },
    "belinda-monocentropus-balfouri": {
      taxonomy: "Monocentropus balfouri is an accepted theraphosid endemic to Socotra, Yemen. A recent integrative revision retained the species in Monocentropus and documented its island habitat and burrows while reorganising related Arabian and African taxa.",
      shelter: "Field photographs and collection experience both place the species around silk-lined ground burrows. The web can spread through nearby soil and structure, joining several entrances into a concealed working area that is far larger than the visible spider.",
      feeding: "Arthropods are taken by ambush at or beyond the retreat. Captive animals can tolerate close neighbours when conditions are carefully managed, but wild social organisation remains insufficiently studied and Belinda's record should not be merged with Bella's.",
      defence: "There are no urticating hairs. Concealment, speed, and defensive posturing are more relevant, while the contrasting blue-and-cream colour is most obvious only when the animal leaves cover.",
      inference: "Belinda's enclosure and observations belong to Belinda alone: deep substrate, a stable refuge, water, and web anchors provide opportunity, while her Codex record documents the choices she actually makes."
    },
    "omothymus-violaceopes": {
      taxonomy: "Omothymus violaceopes is the accepted name for the Singapore blue tarantula, recorded from Singapore and Malaysia. Older hobby and scientific sources may place it in Lampropelma, so using the current combination avoids quietly mixing names.",
      shelter: "A recent Singapore record describes a large arboreal theraphosid inhabiting holes in tree trunks in mangroves and secondary forest. Well-developed adhesive foot pads support movement on vertical surfaces, while the cavity provides a dark, humid refuge.",
      feeding: "The likely hunting position is at or near the tree-hole entrance, where the spider can seize climbing and flying arthropods that come within reach. Direct species-level diet data are limited, so the page does not turn body size into claims about routinely taking vertebrates.",
      defence: "Adult females and juveniles can be violet-blue, while mature males become more brown and roam in search of females. The species lacks urticating hairs; rapid climbing, retreat into a cavity, and defensive posturing make escape prevention more important than display access.",
      inference: "A tall, escape-secure enclosure with vertical cork, a concealed tube-like retreat, water, and careful ventilation reflects the arboreal record. For this confirmed male, routes and secure access matter more than a decorative open canopy."
    },
    "clara-psalmopoeus-irminia": {
      taxonomy: "Psalmopoeus irminia is an accepted theraphosid from northern South America, with the World Spider Catalog recording Venezuela and Guyana. The species belongs to an arboreal lineage whose body proportions and foot pads support rapid movement on bark and other vertical surfaces.",
      shelter: "The spider uses cavities, splits behind bark, and silk-lined tubes that join vertical cover to nearby foliage or substrate. Juveniles may stay closer to the ground, while larger animals can make greater use of elevated retreats; a simple ‘tree spider’ label misses that flexibility.",
      feeding: "Clara is best understood as an ambush predator operating from a concealed vertical route. Arthropods moving across bark or silk provide the cue for a fast capture, followed by withdrawal into cover. Her own feeding history remains separate from the sparse field diet record.",
      defence: "Psalmopoeus does not have urticating hairs. Speed, concealment, and a defensive posture when cornered make opening the enclosure the highest-risk moment, not the animal sitting quietly inside its retreat.",
      inference: "Vertical structure should connect all the way to the substrate, with a narrow retreat, foliage, water, and good airflow. That gives Clara several concealed routes and reduces the need to cross exposed glass during routine activity."
    },
    "siuzi-theraphosa-apophysis": {
      taxonomy: "Theraphosa apophysis is an accepted giant theraphosid recorded from Colombia, Venezuela, and Brazil. It was described in 1991 under Pseudotheraphosa and later transferred to Theraphosa, which explains the older combination still found in some sources.",
      shelter: "Adult females are associated with fossorial retreats in lowland leaf litter. Recent field work documented an adult female at a ground burrow and later climbing roughly twelve metres into a tree, an important reminder that ‘terrestrial’ describes the usual centre of life rather than a physical inability to climb.",
      feeding: "A large-bodied ambush predator can take a wide range of invertebrate prey, and occasional vertebrate predation has been recorded in giant tarantulas. Those unusual events are natural-history observations, not a captive feeding target; appropriately sized invertebrates remain the relevant collection record.",
      defence: "Size is only one part of the defensive system. Theraphosa can retreat, stridulate, posture, and release strongly irritating urticating hairs; the last of these makes face and eye protection during enclosure work particularly important.",
      inference: "Deep supportive substrate, a broad stable retreat, water, high ventilation, and low fall risk suit an animal of Siuzi's mass. Her documented health case and feeding history remain individual evidence, not a substitute for species research."
    }
  };

  const collectionStories = {
    "sabrina-brachypelma-hamorii": "Sabrina is the individual behind this profile. Her orange knee bands make her easy to recognise across the collection, while her own feeding and molt history remains distinct from published species-level information.",
    "ceratogyrus-darlingi": "Gunnar gives the Introvertebrates collection a living record of Ceratogyrus darlingi. His profile brings together verified species information, the introduction video, and observations recorded through the Codex.",
    "chilobrachys-fimbriatus": "This individual has produced the dense webbed retreat documented in the collection photography and rehousing video. Those records describe this animal’s behaviour in my care without turning one resident’s choices into universal care claims.",
    "chilobrachys-kaeng-krachan": "This is the individual kept under the hobby designation Chilobrachys sp. “Kaeng Krachan.” Its paludarium build, feeding records, and future photographs form a personal record while the profile remains transparent about the unresolved formal identity.",
    "elvira-chilobrachys-natanicharum": "Elvira is the individual behind this profile. Her collection record connects the recently described electric-blue species with a named resident whose feeding, molts, and development can be followed over time.",
    "ruby-chromatopelma-cyaneopubescens": "Ruby is one of the most visually distinctive residents in the collection. Her feeding-response video and Codex history give the profile an individual story alongside the accepted taxonomy and range of Chromatopelma cyaneopubescens.",
    "grammostola-pulchripes": "Runa represents Grammostola pulchripes in the current collection. Her recognisable golden leg bands make her easy to follow visually, while the Codex separates personal observations from general species information.",
    "linothele-fallax": "This Linothele fallax broadens the collection beyond tarantulas. Its curtain-web spider identity, patterned abdomen, feeding video, and keeper record give the profile a different biological and visual character from the theraphosid residents.",
    "sonja-mauremys-reevesii": "Sonja is the only vertebrate in the current collection. Her profile follows her as an individual—from the home shown in the accompanying video to the measurements and observations selected from her Codex record—while keeping turtle biology separate from the spider profiles.",
    "bella-monocentropus-balfouri": "Bella is one of two Monocentropus balfouri in my care. Her record remains separate from Belinda’s so that photographs, feeding outcomes, molts, and future observations continue to describe the correct individual.",
    "belinda-monocentropus-balfouri": "Belinda has her own profile because a shared species does not mean a shared history. Her vivarium video and Codex record document her as an individual, independently from Bella’s photographs and observations.",
    "omothymus-violaceopes": "Orion represents Omothymus violaceopes in the current collection. His profile connects the species’ accepted modern name with an individual record that can grow through verified observations, photographs, and video.",
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
  const fieldGuide = fieldGuides[key];
  const deeperHistory = naturalHistorySections[key];
  const norwegianProfileAnchors = {
    "sabrina-brachypelma-hamorii": "sabrina",
    "ruby-chromatopelma-cyaneopubescens": "ruby",
    "sonja-mauremys-reevesii": "sonja"
  };
  const norwegianProfileAnchor = norwegianProfileAnchors[key];

  root.innerHTML = `
    <header class="site-header">
      <div class="header-inner species-shell">
        <a class="brand" href="../index.html" aria-label="Introvertebrates home">
          <img src="../Only spider.png" alt="" width="500" height="500">
          <span>Introvertebrates</span>
        </a>
        <nav class="site-nav" aria-label="Primary navigation">
          <a href="../collection.html" aria-current="page">Collection</a>
          <a href="../learn.html">Learn</a>
          <a href="../research.html">Research</a>
          <a href="../community.html">Community</a>
          <a href="../kryp-og-krabater.html" aria-label="Kryp &amp; Krabater">Kryp</a>
        </nav>
      </div>
    </header>

    <main id="main-content" class="species-page compact-profile-page">
      <section class="species-hero species-shell" aria-labelledby="profile-title">
        <div class="hero-copy">
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="../collection.html">Current collection</a><span aria-hidden="true">/</span><span>Profile</span>
          </nav>
          <p class="eyebrow">Species profile · ${profile.resident}</p>
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
          <div class="species-guide-grid" aria-label="Species overview">
            <article class="species-guide-card"><span>Habitat &amp; lifestyle</span><p>${fieldGuide.lifestyle}</p></article>
            <article class="species-guide-card"><span>What to notice</span><p>${fieldGuide.standout}</p></article>
            <article class="species-guide-card"><span>In this collection</span><p>${fieldGuide.inCare}</p></article>
          </div>
          <h3>Taxonomy and range</h3>
          <p>${deeperHistory?.taxonomy || profile.naturalHistory[0]}</p>
          ${deeperHistory ? `
            <h3>Burrows, shelter, and activity</h3>
            <p>${deeperHistory.shelter}</p>
            <h3>Feeding ecology</h3>
            <p>${deeperHistory.feeding}</p>
            <h3>Defence, senses, and movement</h3>
            <p>${deeperHistory.defence}</p>
          ` : `
            <h3>What the record can show</h3>
            ${profile.naturalHistory.slice(1).map((paragraph) => `<p>${paragraph}</p>`).join("")}
          `}
          <aside class="context-note">
            <strong>${deeperHistory ? "From natural history to husbandry" : "Research and keeper observations"}</strong>
            <p>${deeperHistory?.inference || "Published taxonomy and distribution are kept separate from photographs, videos, and Codex records of this resident. That makes it clear which statements come from research and which describe an animal in my care."}</p>
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

      <section class="profile-section species-shell profile-instagram-section" data-instagram-profile="${key}" hidden aria-labelledby="instagram-profile-title">
        <header class="section-heading"><p class="section-kicker">From Instagram</p><h2 id="instagram-profile-title">Posts &amp; reels.</h2></header>
        <div class="section-copy">
          <p class="profile-social-intro">Selected public photographs and reels connected to this animal or its biology. The original Instagram post loads in the page, with a direct link underneath as a fallback.</p>
          <div class="profile-instagram-grid" data-instagram-items></div>
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
            <a class="button" href="../community.html#submit">Submit a community record</a>
            ${norwegianProfileAnchor ? `<a class="button" href="../kryp-artsprofiler.html#${norwegianProfileAnchor}" lang="no">Les profilen på norsk</a>` : ""}
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
          <a href="../index.html">Home</a><a href="../collection.html">Collection</a><a href="../learn.html">Learn</a><a href="../research.html">Research</a><a href="../community.html">Community</a><a href="../kryp-og-krabater.html">Kryp &amp; Krabater</a><a href="https://www.youtube.com/@Introvertebrates" target="_blank" rel="noopener noreferrer">YouTube</a><a href="https://www.instagram.com/introvertebrates_yt/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="mailto:erlend@introvertebrates.com">Contact</a>
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
