export const enCaseStudyMessages = {
  backToProjects: 'Back to projects',
  eyebrow: 'Technical case study · Public repository',
  sections: {
    overview: 'Overview',
    technicalContext: 'Technical context',
    documentedFlow: 'Documented workflow',
    architecture: 'Architecture',
    publicStatus: 'Public status',
  },
  sourcesTitle: 'Public sources reviewed',
  apexLap: {
    headline: 'ApexLap Coach: turning telemetry into driving guidance',
    overview: {
      title: 'From a recorded lap to voice feedback',
      body:
        'ApexLap Coach uses telemetry available from iRacing to compare the current lap with a reference for the same car, track, and layout. The analysis aligns data points by distance or position on the track, segments sectors and corners, and turns observed differences into voice feedback and a history for later review.',
    },
    technicalContext: {
      title: 'Comparing laps without losing track context',
      body:
        'Laps with different times do not keep the same events at the same instant. The project documentation avoids this dependence on absolute time: data points are normalized by distance and lapPct, so the same regions of the track can be aligned before comparing corner phases and events involving braking, throttle, steering, gears, and vehicle dynamics.',
    },
    pipeline: {
      title: 'Analysis pipeline',
      capture: { label: 'Capture', description: 'Receives or imports telemetry.' },
      normalization: {
        label: 'Normalization',
        description: 'Organizes data points by distance and position on the track.',
      },
      reference: { label: 'Reference', description: 'Loads a compatible reference lap.' },
      segmentation: { label: 'Segmentation', description: 'Identifies sectors and corners.' },
      comparison: {
        label: 'Comparison',
        description: 'Evaluates differences across corner phases.',
      },
      classification: {
        label: 'Classification',
        description: 'Identifies events and applies confidence rules.',
      },
      persistence: {
        label: 'Persistence',
        description: 'Stores laps, sectors, corners, and evidence locally.',
      },
      voice: {
        label: 'Voice',
        description: 'Queues the message according to priority and the interval between feedback messages.',
      },
    },
    decisions: {
      title: 'Documented technical decisions',
      spatialAlignment: {
        title: 'Spatial alignment',
        body:
          'The comparison uses distance and lapPct to preserve the correspondence between regions of the track when lap times differ.',
      },
      domainBoundary: {
        title: 'Domain logic separated from the interface',
        body:
          'The development guide defines domain logic as responsible for coaching decisions without depending on infrastructure, Electron, or the renderer. The React interface presents the data and should not calculate critical telemetry.',
      },
      feedbackTiming: {
        title: 'Feedback outside the critical moment',
        body:
          'Primary feedback is delivered after the corner. Technique messages receive priority, and the voice queue accounts for priority and timing so guidance does not overlap.',
      },
      localVoice: {
        title: 'Locally prepared voice assets',
        body:
          'The project maintains phrases and audio by locale and documents the use of pre-generated audio, with no text-to-speech call while the application is running.',
      },
      releaseGates: {
        title: 'Verification before packaging',
        body:
          'The public workflow runs type checking and tests before generating Windows executables and updating the release.',
      },
    },
    constraints: {
      title: 'Reliability depends on context',
      body:
        'The documentation accounts for incompatible references, invalid laps, loss carried over from a previous corner, and events such as auto blip that could be mistaken for a throttle error. These cases are treated as analysis constraints, without any public claim of accuracy or performance.',
    },
    publicStatus: {
      title: 'What is available',
      body:
        'The code and documentation are available for review on GitHub. The repository records version 0.6.2 and provides a public release with Windows artifacts. The audited sources do not provide a web demo, an approved gallery, or a license identified by the GitHub API.',
    },
    diagram: {
      label: 'Conceptual diagram',
      accessibleName: 'Conceptual flow from telemetry to voice feedback.',
      telemetry: 'Telemetry',
      normalization: 'Normalization',
      reference: 'Compatible reference',
      sectors: 'Sectors and corners',
      feedbackRules: 'Feedback rules',
      voice: 'Voice',
      caption: 'Conceptual diagram based on the public ApexLap Coach documentation.',
    },
    sources: {
      repositoryApi: 'Public repository API',
      readme: 'README at the audited commit',
      manifest: 'Application manifest',
      developerGuide: 'Development guide',
      driverGuide: 'Driver guide',
      releaseWorkflow: 'Public release workflow',
      publicRelease: 'Public release v0.6.2',
    },
  },
} as const;

type DeepWidenStrings<T> = T extends string
  ? string
  : T extends object
    ? { readonly [Key in keyof T]: DeepWidenStrings<T[Key]> }
    : T;

export type CaseStudyMessages = DeepWidenStrings<typeof enCaseStudyMessages>;
