// Topic-specific fact-checking formats for intelligent analysis
export interface FactCheckFormat {
  topic: string
  keywords: string[]
  analysisStructure: AnalysisStructure
  requiredSources: SourceRequirement[]
  verificationSteps: VerificationStep[]
  outputTemplate: OutputTemplate
}

export interface AnalysisStructure {
  sections: AnalysisSection[]
  keyMetrics: string[]
  comparisonPoints: string[]
  contextualFactors: string[]
}

export interface AnalysisSection {
  title: string
  type: 'statistical' | 'policy' | 'historical' | 'comparative' | 'expert'
  requiredData: string[]
  analysisDepth: 'basic' | 'detailed' | 'comprehensive'
}

export interface SourceRequirement {
  type: 'government' | 'academic' | 'international' | 'statistical' | 'legal'
  priority: 'essential' | 'important' | 'supplementary'
  specificSources: string[]
  dataPoints: string[]
}

export interface VerificationStep {
  step: string
  method: 'cross-reference' | 'statistical-analysis' | 'expert-validation' | 'historical-comparison'
  sources: string[]
  expectedOutcome: string
}

export interface OutputTemplate {
  verdictCriteria: VerdictCriteria
  summaryStructure: string[]
  detailedSections: string[]
  keyPointsFormat: string[]
  sourcePresentation: string
}

export interface VerdictCriteria {
  trueConditions: string[]
  falseConditions: string[]
  partiallyTrueConditions: string[]
  misleadingConditions: string[]
  unverifiedConditions: string[]
}

// Topic-specific formats
export const FACT_CHECK_FORMATS: Record<string, FactCheckFormat> = {
  INFRASTRUCTURE: {
    topic: 'Infrastructure Development',
    keywords: ['road', 'highway', 'bridge', 'construction', 'infrastructure', 'transport', 'connectivity'],
    analysisStructure: {
      sections: [
        {
          title: 'Current Infrastructure Status',
          type: 'statistical',
          requiredData: ['total_length', 'quality_metrics', 'international_rankings', 'budget_allocation'],
          analysisDepth: 'comprehensive'
        },
        {
          title: 'Government Policy & Investment',
          type: 'policy',
          requiredData: ['policy_documents', 'budget_allocation', 'timeline', 'targets'],
          analysisDepth: 'detailed'
        },
        {
          title: 'International Comparison',
          type: 'comparative',
          requiredData: ['global_rankings', 'peer_countries', 'standards_comparison'],
          analysisDepth: 'detailed'
        },
        {
          title: 'Historical Progress',
          type: 'historical',
          requiredData: ['past_performance', 'growth_trends', 'milestone_achievements'],
          analysisDepth: 'basic'
        }
      ],
      keyMetrics: ['length_km', 'quality_index', 'safety_rating', 'construction_rate', 'budget_utilization'],
      comparisonPoints: ['international_standards', 'peer_countries', 'historical_performance'],
      contextualFactors: ['economic_impact', 'regional_variations', 'maintenance_challenges']
    },
    requiredSources: [
      {
        type: 'government',
        priority: 'essential',
        specificSources: ['MORTH', 'NHAI', 'Ministry_Statistics'],
        dataPoints: ['official_statistics', 'policy_documents', 'progress_reports']
      },
      {
        type: 'international',
        priority: 'important',
        specificSources: ['World_Economic_Forum', 'World_Bank', 'OECD'],
        dataPoints: ['global_rankings', 'comparative_studies', 'best_practices']
      },
      {
        type: 'academic',
        priority: 'supplementary',
        specificSources: ['IIT_studies', 'research_papers', 'technical_reports'],
        dataPoints: ['technical_analysis', 'impact_studies', 'recommendations']
      }
    ],
    verificationSteps: [
      {
        step: 'Verify official statistics',
        method: 'cross-reference',
        sources: ['MORTH_reports', 'NHAI_data', 'Parliamentary_records'],
        expectedOutcome: 'Consistent official data across sources'
      },
      {
        step: 'Compare international rankings',
        method: 'statistical-analysis',
        sources: ['WEF_reports', 'World_Bank_data', 'OECD_statistics'],
        expectedOutcome: 'Validated global position'
      },
      {
        step: 'Expert opinion validation',
        method: 'expert-validation',
        sources: ['IIT_experts', 'industry_professionals', 'policy_analysts'],
        expectedOutcome: 'Professional consensus on claims'
      }
    ],
    outputTemplate: {
      verdictCriteria: {
        trueConditions: ['Official data confirms claim', 'Multiple sources agree', 'Recent verified statistics'],
        falseConditions: ['Official data contradicts claim', 'International rankings show otherwise', 'Expert consensus disagrees'],
        partiallyTrueConditions: ['Some aspects true but incomplete', 'Regional variations exist', 'Time-specific accuracy'],
        misleadingConditions: ['Selective data presentation', 'Outdated information', 'Context manipulation'],
        unverifiedConditions: ['Insufficient official data', 'Conflicting sources', 'Pending verification']
      },
      summaryStructure: [
        'Claim assessment with verdict',
        'Key statistical findings',
        'Government policy context',
        'International comparison',
        'Expert consensus'
      ],
      detailedSections: [
        'Statistical Analysis',
        'Policy Framework',
        'International Benchmarking',
        'Historical Context',
        'Expert Opinions',
        'Future Projections'
      ],
      keyPointsFormat: [
        'Official statistics with sources',
        'International ranking position',
        'Government investment figures',
        'Quality metrics comparison',
        'Expert assessment summary'
      ],
      sourcePresentation: 'Government sources first, then international, then academic with credibility scores'
    }
  },

  ENVIRONMENT: {
    topic: 'Environmental Issues',
    keywords: ['pollution', 'clean', 'environment', 'river', 'air quality', 'climate', 'green', 'sustainable'],
    analysisStructure: {
      sections: [
        {
          title: 'Environmental Data Analysis',
          type: 'statistical',
          requiredData: ['pollution_levels', 'quality_indices', 'monitoring_data', 'trend_analysis'],
          analysisDepth: 'comprehensive'
        },
        {
          title: 'Government Programs & Policies',
          type: 'policy',
          requiredData: ['environmental_policies', 'budget_allocation', 'program_details', 'targets'],
          analysisDepth: 'detailed'
        },
        {
          title: 'Scientific Assessment',
          type: 'expert',
          requiredData: ['research_studies', 'expert_opinions', 'peer_review', 'methodology'],
          analysisDepth: 'comprehensive'
        },
        {
          title: 'International Standards Comparison',
          type: 'comparative',
          requiredData: ['WHO_standards', 'international_benchmarks', 'global_rankings'],
          analysisDepth: 'detailed'
        }
      ],
      keyMetrics: ['pollution_index', 'quality_parameters', 'improvement_rate', 'compliance_percentage'],
      comparisonPoints: ['WHO_standards', 'international_cities', 'historical_data'],
      contextualFactors: ['seasonal_variations', 'industrial_impact', 'population_density', 'geographic_factors']
    },
    requiredSources: [
      {
        type: 'government',
        priority: 'essential',
        specificSources: ['CPCB', 'Ministry_Environment', 'NITI_Aayog'],
        dataPoints: ['monitoring_data', 'policy_documents', 'progress_reports']
      },
      {
        type: 'international',
        priority: 'essential',
        specificSources: ['WHO', 'UNEP', 'World_Bank'],
        dataPoints: ['global_standards', 'comparative_data', 'best_practices']
      },
      {
        type: 'academic',
        priority: 'important',
        specificSources: ['IIT_research', 'environmental_studies', 'peer_reviewed_papers'],
        dataPoints: ['scientific_analysis', 'methodology_validation', 'impact_assessment']
      }
    ],
    verificationSteps: [
      {
        step: 'Verify monitoring data',
        method: 'cross-reference',
        sources: ['CPCB_data', 'state_boards', 'real_time_monitoring'],
        expectedOutcome: 'Consistent environmental measurements'
      },
      {
        step: 'Compare with international standards',
        method: 'statistical-analysis',
        sources: ['WHO_guidelines', 'international_benchmarks'],
        expectedOutcome: 'Validated compliance status'
      },
      {
        step: 'Scientific methodology review',
        method: 'expert-validation',
        sources: ['environmental_scientists', 'research_institutions'],
        expectedOutcome: 'Scientifically sound assessment'
      }
    ],
    outputTemplate: {
      verdictCriteria: {
        trueConditions: ['Scientific data supports claim', 'Multiple monitoring sources confirm', 'Expert consensus exists'],
        falseConditions: ['Scientific data contradicts', 'Monitoring shows otherwise', 'Expert disagreement'],
        partiallyTrueConditions: ['Improvement shown but incomplete', 'Regional variations', 'Seasonal factors'],
        misleadingConditions: ['Cherry-picked data', 'Outdated measurements', 'Methodology issues'],
        unverifiedConditions: ['Insufficient monitoring data', 'Conflicting studies', 'Ongoing research']
      },
      summaryStructure: [
        'Environmental claim assessment',
        'Scientific data analysis',
        'Government program evaluation',
        'International comparison',
        'Expert scientific consensus'
      ],
      detailedSections: [
        'Environmental Data Analysis',
        'Government Policy Assessment',
        'Scientific Methodology Review',
        'International Benchmarking',
        'Expert Opinions',
        'Long-term Trends'
      ],
      keyPointsFormat: [
        'Monitoring data with sources',
        'Government program progress',
        'International standard compliance',
        'Scientific consensus',
        'Trend analysis summary'
      ],
      sourcePresentation: 'Scientific sources first, then government data, then international standards'
    }
  },

  ECONOMY: {
    topic: 'Economic Claims',
    keywords: ['GDP', 'growth', 'economy', 'inflation', 'employment', 'budget', 'investment', 'trade'],
    analysisStructure: {
      sections: [
        {
          title: 'Economic Data Verification',
          type: 'statistical',
          requiredData: ['GDP_data', 'growth_rates', 'employment_statistics', 'inflation_data'],
          analysisDepth: 'comprehensive'
        },
        {
          title: 'Government Economic Policy',
          type: 'policy',
          requiredData: ['budget_documents', 'policy_announcements', 'economic_surveys'],
          analysisDepth: 'detailed'
        },
        {
          title: 'International Economic Comparison',
          type: 'comparative',
          requiredData: ['global_rankings', 'peer_economy_comparison', 'international_forecasts'],
          analysisDepth: 'detailed'
        },
        {
          title: 'Expert Economic Analysis',
          type: 'expert',
          requiredData: ['economist_opinions', 'institutional_forecasts', 'research_analysis'],
          analysisDepth: 'comprehensive'
        }
      ],
      keyMetrics: ['GDP_growth_rate', 'inflation_rate', 'employment_rate', 'investment_levels', 'trade_balance'],
      comparisonPoints: ['international_peers', 'historical_performance', 'global_averages'],
      contextualFactors: ['global_economic_conditions', 'policy_impact', 'structural_factors']
    },
    requiredSources: [
      {
        type: 'government',
        priority: 'essential',
        specificSources: ['RBI', 'Ministry_Finance', 'NITI_Aayog', 'NSO'],
        dataPoints: ['official_statistics', 'policy_documents', 'economic_surveys']
      },
      {
        type: 'international',
        priority: 'essential',
        specificSources: ['IMF', 'World_Bank', 'OECD', 'ADB'],
        dataPoints: ['global_forecasts', 'comparative_data', 'economic_assessments']
      },
      {
        type: 'academic',
        priority: 'important',
        specificSources: ['economic_research', 'think_tanks', 'university_studies'],
        dataPoints: ['research_analysis', 'methodology_review', 'policy_impact_studies']
      }
    ],
    verificationSteps: [
      {
        step: 'Verify official economic data',
        method: 'cross-reference',
        sources: ['RBI_data', 'NSO_statistics', 'Ministry_reports'],
        expectedOutcome: 'Consistent official economic indicators'
      },
      {
        step: 'Compare international assessments',
        method: 'statistical-analysis',
        sources: ['IMF_data', 'World_Bank_reports', 'OECD_statistics'],
        expectedOutcome: 'Validated international perspective'
      },
      {
        step: 'Expert economic validation',
        method: 'expert-validation',
        sources: ['economists', 'research_institutions', 'policy_analysts'],
        expectedOutcome: 'Professional economic consensus'
      }
    ],
    outputTemplate: {
      verdictCriteria: {
        trueConditions: ['Official data confirms', 'International sources agree', 'Expert consensus supports'],
        falseConditions: ['Official data contradicts', 'International assessments differ', 'Expert disagreement'],
        partiallyTrueConditions: ['Contextual accuracy', 'Time-specific validity', 'Methodological variations'],
        misleadingConditions: ['Selective data use', 'Outdated figures', 'Context manipulation'],
        unverifiedConditions: ['Preliminary data', 'Conflicting sources', 'Insufficient information']
      },
      summaryStructure: [
        'Economic claim verification',
        'Official data analysis',
        'International perspective',
        'Expert assessment',
        'Policy context'
      ],
      detailedSections: [
        'Economic Data Analysis',
        'Government Policy Context',
        'International Comparison',
        'Expert Economic Opinion',
        'Historical Trends',
        'Future Projections'
      ],
      keyPointsFormat: [
        'Official statistics with verification',
        'International ranking/comparison',
        'Government policy impact',
        'Expert consensus summary',
        'Trend analysis'
      ],
      sourcePresentation: 'Official economic data first, then international institutions, then expert analysis'
    }
  },

  HEALTH: {
    topic: 'Health & Medical Claims',
    keywords: ['health', 'medical', 'disease', 'treatment', 'vaccine', 'hospital', 'doctor', 'medicine'],
    analysisStructure: {
      sections: [
        {
          title: 'Medical Evidence Review',
          type: 'expert',
          requiredData: ['clinical_studies', 'peer_review', 'medical_consensus', 'evidence_quality'],
          analysisDepth: 'comprehensive'
        },
        {
          title: 'Government Health Policy',
          type: 'policy',
          requiredData: ['health_policies', 'official_guidelines', 'program_details'],
          analysisDepth: 'detailed'
        },
        {
          title: 'International Health Standards',
          type: 'comparative',
          requiredData: ['WHO_guidelines', 'international_protocols', 'global_best_practices'],
          analysisDepth: 'comprehensive'
        },
        {
          title: 'Statistical Health Data',
          type: 'statistical',
          requiredData: ['health_statistics', 'epidemiological_data', 'outcome_measures'],
          analysisDepth: 'detailed'
        }
      ],
      keyMetrics: ['efficacy_rates', 'safety_profiles', 'statistical_significance', 'population_impact'],
      comparisonPoints: ['international_standards', 'peer_reviewed_evidence', 'clinical_guidelines'],
      contextualFactors: ['population_demographics', 'healthcare_infrastructure', 'cultural_factors']
    },
    requiredSources: [
      {
        type: 'government',
        priority: 'essential',
        specificSources: ['Ministry_Health', 'ICMR', 'AIIMS', 'health_departments'],
        dataPoints: ['official_guidelines', 'health_statistics', 'policy_documents']
      },
      {
        type: 'international',
        priority: 'essential',
        specificSources: ['WHO', 'CDC', 'medical_journals', 'international_health_organizations'],
        dataPoints: ['global_guidelines', 'research_evidence', 'best_practices']
      },
      {
        type: 'academic',
        priority: 'essential',
        specificSources: ['peer_reviewed_journals', 'medical_institutions', 'research_studies'],
        dataPoints: ['clinical_evidence', 'research_methodology', 'expert_opinions']
      }
    ],
    verificationSteps: [
      {
        step: 'Review medical evidence',
        method: 'expert-validation',
        sources: ['peer_reviewed_studies', 'medical_experts', 'clinical_trials'],
        expectedOutcome: 'Evidence-based medical consensus'
      },
      {
        step: 'Verify official health data',
        method: 'cross-reference',
        sources: ['health_ministry_data', 'WHO_statistics', 'medical_institutions'],
        expectedOutcome: 'Consistent health information'
      },
      {
        step: 'Compare international standards',
        method: 'statistical-analysis',
        sources: ['WHO_guidelines', 'international_protocols'],
        expectedOutcome: 'Validated against global standards'
      }
    ],
    outputTemplate: {
      verdictCriteria: {
        trueConditions: ['Strong medical evidence', 'Official health confirmation', 'International consensus'],
        falseConditions: ['Medical evidence contradicts', 'Official health denial', 'Scientific disagreement'],
        partiallyTrueConditions: ['Limited evidence', 'Conditional effectiveness', 'Population-specific'],
        misleadingConditions: ['Misrepresented studies', 'Outdated medical info', 'Context manipulation'],
        unverifiedConditions: ['Insufficient studies', 'Ongoing research', 'Conflicting evidence']
      },
      summaryStructure: [
        'Medical claim assessment',
        'Scientific evidence review',
        'Official health position',
        'International standards',
        'Expert medical consensus'
      ],
      detailedSections: [
        'Medical Evidence Analysis',
        'Government Health Policy',
        'International Guidelines',
        'Statistical Data Review',
        'Expert Medical Opinions',
        'Safety and Efficacy'
      ],
      keyPointsFormat: [
        'Peer-reviewed evidence summary',
        'Official health guidelines',
        'International standard compliance',
        'Statistical significance',
        'Medical expert consensus'
      ],
      sourcePresentation: 'Peer-reviewed medical sources first, then official health data, then international guidelines'
    }
  }
}

// Topic detection and format selection
export class TopicAnalyzer {
  static detectTopic(claim: string): string {
    const claimLower = claim.toLowerCase()
    
    for (const [topicKey, format] of Object.entries(FACT_CHECK_FORMATS)) {
      const keywordMatches = format.keywords.filter(keyword => 
        claimLower.includes(keyword.toLowerCase())
      ).length
      
      if (keywordMatches >= 2) {
        return topicKey
      }
    }
    
    return 'GENERAL'
  }
  
  static getFormat(topic: string): FactCheckFormat | null {
    return FACT_CHECK_FORMATS[topic] || null
  }
  
  static analyzeClaimStructure(claim: string, format: FactCheckFormat) {
    return {
      topic: format.topic,
      requiredAnalysis: format.analysisStructure.sections,
      keyMetrics: format.analysisStructure.keyMetrics,
      verificationSteps: format.verificationSteps,
      expectedSources: format.requiredSources
    }
  }
}