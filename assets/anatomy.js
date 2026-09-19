(() => {
  const stage = document.querySelector('.body-map-stage');
  if (!stage) return;

  const controls = [...document.querySelectorAll('.body-map-control')];
  const mapParts = [...stage.querySelectorAll('[data-map-part]')];
  const kicker = document.getElementById('body-map-kicker');
  const name = document.getElementById('body-map-name');
  const description = document.getElementById('body-map-description');
  const deepLink = document.getElementById('body-map-link');

  const parts = {
    whole: {
      kicker: 'The complete plan',
      name: 'One animal, two body regions',
      description: 'A spider’s prosoma carries the eyes, mouthparts, pedipalps, and eight walking legs. A narrow pedicel joins it to the softer abdomen.',
      link: '#body-regions',
      label: 'See the two body regions'
    },
    prosoma: {
      kicker: 'Front body region',
      name: 'Prosoma',
      description: 'Also called the cephalothorax. It carries the eyes, chelicerae, pedipalps, and four pairs of walking legs beneath the dorsal carapace.',
      link: '#body-regions',
      label: 'Explore the body regions'
    },
    abdomen: {
      kicker: 'Rear body region',
      name: 'Opisthosoma',
      description: 'Commonly called the abdomen. It houses much of the digestive, circulatory, reproductive, respiratory, and silk-producing anatomy.',
      link: '#internal-anatomy',
      label: 'Look inside the abdomen'
    },
    legs: {
      kicker: 'Four pairs',
      name: 'Eight walking legs',
      description: 'Each walking leg has seven main segments from coxa to tarsus. Muscles and changes in internal pressure both contribute to movement.',
      link: '#legs',
      label: 'Follow a leg segment by segment'
    },
    pedipalps: {
      kicker: 'Second appendage pair',
      name: 'Pedipalps',
      description: 'Shorter than the walking legs, pedipalps help with sensing and handling food. In mature males, their tips carry specialised reproductive organs.',
      link: '#front-end',
      label: 'See pedipalps in a real photograph'
    },
    chelicerae: {
      kicker: 'First appendage pair',
      name: 'Chelicerae and fangs',
      description: 'Each chelicera carries a hinged fang. Together they puncture, hold, and manipulate prey while venom can pass through an opening near each fang tip.',
      link: '#front-end',
      label: 'See the exposed fangs'
    },
    eyes: {
      kicker: 'Light-sensing organs',
      name: 'Simple eyes',
      description: 'Many spiders have eight eyes, but number, scale, and arrangement vary. The compact cluster sits near the front of the prosoma.',
      link: '#front-end',
      label: 'Inspect the eye cluster'
    },
    spinnerets: {
      kicker: 'Silk delivery system',
      name: 'Spinnerets',
      description: 'Movable appendages at the rear of the abdomen carry many tiny spigots. Silk glands remain inside the abdomen; the spinnerets place the strands outside.',
      link: '#silk',
      label: 'Follow silk from gland to web'
    }
  };

  const selectPart = (part) => {
    const content = parts[part];
    if (!content) return;

    stage.dataset.activePart = part;
    controls.forEach((control) => {
      const active = control.dataset.part === part;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });

    kicker.textContent = content.kicker;
    name.textContent = content.name;
    description.textContent = content.description;
    deepLink.href = content.link;
    deepLink.innerHTML = `${content.label} <span aria-hidden="true">→</span>`;
  };

  controls.forEach((control) => {
    control.addEventListener('click', () => selectPart(control.dataset.part));
  });

  mapParts.forEach((part) => {
    part.addEventListener('pointerenter', () => selectPart(part.dataset.mapPart));
    part.addEventListener('click', () => selectPart(part.dataset.mapPart));
  });
})();

(() => {
  const model = document.querySelector('.leg-model');
  if (!model) return;

  const controls = [...model.querySelectorAll('.leg-model-control')];
  const segments = [...model.querySelectorAll('[data-leg-segment]')];
  const position = document.getElementById('leg-model-position');
  const name = document.getElementById('leg-model-name');
  const description = document.getElementById('leg-model-description');
  const content = {
    whole: ['Body → foot', 'A linked, bent limb', 'Seven main segments connect the body to the foot. Select one to hold it in the light while the others recede.'],
    coxa: ['Segment 1 · nearest the body', 'Coxa', 'The basal segment attaches the walking leg to the prosoma and forms the first link in the limb.'],
    trochanter: ['Segment 2', 'Trochanter', 'A short segment between the coxa and femur. Its small size can make it easy to overlook in photographs.'],
    femur: ['Segment 3', 'Femur', 'Usually one of the longest and most substantial segments, extending outward from the short basal segments.'],
    patella: ['Segment 4', 'Patella', 'A shorter joint segment between the femur and tibia—the spider-leg equivalent of a clearly defined intermediate link.'],
    tibia: ['Segment 5', 'Tibia', 'A long segment beyond the patella. In mature males of some species it may carry specialised structures, but these vary.'],
    metatarsus: ['Segment 6', 'Metatarsus', 'The long penultimate segment between tibia and tarsus. Its proportions vary with lineage and lifestyle.'],
    tarsus: ['Segment 7 · the foot', 'Tarsus', 'The terminal segment bears the claws and may carry dense adhesive hairs. The exact arrangement differs among spiders.']
  };

  const selectSegment = (segment) => {
    if (!content[segment]) return;
    model.dataset.activeSegment = segment;
    controls.forEach((control) => {
      const active = control.dataset.segment === segment;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });
    [position.textContent, name.textContent, description.textContent] = content[segment];
  };

  controls.forEach((control) => {
    control.addEventListener('click', () => selectSegment(control.dataset.segment));
    control.addEventListener('pointerenter', () => selectSegment(control.dataset.segment));
  });
  segments.forEach((segment) => {
    segment.addEventListener('pointerenter', () => selectSegment(segment.dataset.legSegment));
    segment.addEventListener('click', () => selectSegment(segment.dataset.legSegment));
  });
})();

(() => {
  const map = document.querySelector('.internal-map');
  if (!map) return;

  const controls = [...map.querySelectorAll('.internal-key-item')];
  const systems = [...map.querySelectorAll('[data-internal-system]')];
  const selectSystem = (system) => {
    map.dataset.activeSystem = system;
    controls.forEach((control) => {
      const active = control.dataset.system === system;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });
  };

  controls.forEach((control) => {
    control.addEventListener('click', () => selectSystem(control.dataset.system));
    control.addEventListener('pointerenter', () => selectSystem(control.dataset.system));
  });
  systems.forEach((system) => {
    system.addEventListener('pointerenter', () => selectSystem(system.dataset.internalSystem));
    system.addEventListener('click', () => selectSystem(system.dataset.internalSystem));
  });

})();
