import { prisma } from './prisma'

export async function seedDatabase() {
  try {
    // Create sample users
    const user1 = await prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        email: 'john.doe@example.com',
        name: 'John Doe',
      },
    })

    const user2 = await prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
      },
    })

    const user3 = await prisma.user.upsert({
      where: { email: 'alex.reporter@example.com' },
      update: {},
      create: {
        email: 'alex.reporter@example.com',
        name: 'Alex Reporter',
      },
    })

    // Create sample tags
    const politicsTag = await prisma.tag.upsert({
      where: { name: 'Politics' },
      update: {},
      create: { name: 'Politics' },
    })

    const economyTag = await prisma.tag.upsert({
      where: { name: 'Economy' },
      update: {},
      create: { name: 'Economy' },
    })

    const rtiTag = await prisma.tag.upsert({
      where: { name: 'RTI' },
      update: {},
      create: { name: 'RTI' },
    })

    const cultureTag = await prisma.tag.upsert({
      where: { name: 'Culture' },
      update: {},
      create: { name: 'Culture' },
    })

    const technologyTag = await prisma.tag.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology' },
    })

    const healthTag = await prisma.tag.upsert({
      where: { name: 'Health' },
      update: {},
      create: { name: 'Health' },
    })

    const environmentTag = await prisma.tag.upsert({
      where: { name: 'Environment' },
      update: {},
      create: { name: 'Environment' },
    })

    const educationTag = await prisma.tag.upsert({
      where: { name: 'Education' },
      update: {},
      create: { name: 'Education' },
    })

    // Create sample articles with rich content
    const articles = [
      {
        title: 'Breaking: Major Political Reform Bill Passes Parliament',
        slug: 'major-political-reform-bill-passes-parliament',
        coverUrl: 'https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        contentMd: `# Major Political Reform Bill Passes Parliament

In a historic vote today, Parliament passed the comprehensive Political Reform Bill with a decisive majority, marking the most significant changes to democratic processes in decades.

## Key Provisions of the Bill

The legislation introduces several groundbreaking measures:

### Electoral Reforms
- **Campaign Finance Transparency**: All political donations above $1,000 must be disclosed within 48 hours
- **Digital Advertising Rules**: Political ads on social media platforms must clearly identify their sponsors
- **Voting Access**: Extended polling hours and mandatory early voting options in all constituencies

### Accountability Measures
- **Ethics Oversight**: Creation of an independent Parliamentary Ethics Commission
- **Conflict of Interest**: Stricter rules for MPs regarding business interests and investments
- **Public Records**: Enhanced access to parliamentary proceedings and voting records

## Expert Analysis

Political scientist Dr. Sarah Chen commented: "This bill represents a watershed moment for democratic accountability. The transparency measures alone will fundamentally change how politics operates."

## Implementation Timeline

The reforms will be rolled out in phases:
1. **Phase 1 (Next 6 months)**: Ethics Commission establishment
2. **Phase 2 (12 months)**: Campaign finance rules take effect
3. **Phase 3 (18 months)**: Full implementation of all provisions

## Public Response

Initial polling shows 78% public support for the reforms, with particularly strong backing from younger voters who have long advocated for greater political transparency.

The verification process for this article involved cross-referencing parliamentary records, interviewing key stakeholders, and consulting with constitutional law experts.`,
        readTime: 8,
        verifiedPct: 94,
        authorId: user1.id,
        tags: {
          connect: [{ id: politicsTag.id }],
        },
      },
      {
        title: 'Economic Recovery Shows Strong Momentum Across All Sectors',
        slug: 'economic-recovery-strong-momentum-all-sectors',
        coverUrl: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        contentMd: `# Economic Recovery Shows Strong Momentum

Latest economic indicators reveal robust growth across multiple sectors, with GDP expanding at its fastest rate in five years.

## Growth by the Numbers

### Q3 Performance Highlights
- **GDP Growth**: 4.2% year-over-year, exceeding all forecasts
- **Employment**: Unemployment drops to 3.8%, lowest in a decade
- **Consumer Spending**: Up 6.1% from previous quarter
- **Business Investment**: 8.3% increase in capital expenditure

## Sector Analysis

### Technology Sector
The tech industry continues to lead growth with:
- Software companies reporting 15% revenue increases
- Hardware manufacturing up 12%
- AI and machine learning investments reaching record highs

### Manufacturing Renaissance
- Factory output increased 7.2% year-over-year
- New manufacturing jobs created at fastest pace since 2019
- Supply chain disruptions largely resolved

### Services Sector Strength
- Hospitality and tourism recovering to pre-pandemic levels
- Financial services showing steady 5% growth
- Healthcare services expanding to meet demographic demands

## Expert Perspectives

Chief Economist Maria Rodriguez notes: "This isn't just a cyclical upturn—we're seeing structural improvements in productivity and innovation that suggest sustained growth ahead."

## Challenges Ahead

Despite positive trends, economists warn of potential headwinds:
- **Inflation Concerns**: Core inflation remains above target at 3.2%
- **Global Uncertainties**: International trade tensions could impact exports
- **Labor Shortages**: Skills gaps in key industries may constrain growth

## Policy Implications

The strong economic performance gives policymakers room to:
- Gradually normalize monetary policy
- Invest in infrastructure and education
- Address long-term fiscal challenges

This analysis is based on official government statistics, Federal Reserve data, and interviews with leading economists.`,
        readTime: 7,
        verifiedPct: 91,
        authorId: user2.id,
        tags: {
          connect: [{ id: economyTag.id }],
        },
      },
      {
        title: 'RTI Investigation Exposes Government Transparency Gaps',
        slug: 'rti-investigation-exposes-transparency-gaps',
        coverUrl: 'https://images.pexels.com/photos/8441824/pexels-photo-8441824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        contentMd: `# RTI Investigation Exposes Government Transparency Gaps

A comprehensive six-month investigation using Right to Information requests has uncovered significant transparency issues across multiple government departments.

## Investigation Methodology

Our investigation involved:
- **150+ RTI Requests** filed across 25 government departments
- **Response Time Analysis** tracking compliance with legal deadlines
- **Information Quality Assessment** evaluating completeness of responses
- **Cross-Department Comparison** identifying best and worst performers

## Key Findings

### Response Time Violations
- **42% of requests** exceeded the mandatory 30-day response deadline
- **Average delay**: 18 additional days beyond legal requirement
- **Worst performer**: Department of Urban Development (67% late responses)
- **Best performer**: Ministry of Health (89% on-time responses)

### Information Quality Issues
- **23% of responses** were incomplete or evasive
- **15% of requests** were improperly rejected
- **8% of responses** contained redacted information without proper justification

## Department-by-Department Analysis

### High Performers
1. **Ministry of Health**: 89% on-time, comprehensive responses
2. **Department of Education**: 84% compliance rate
3. **Environmental Protection Agency**: 81% satisfactory responses

### Areas of Concern
1. **Urban Development**: Poor response times, frequent rejections
2. **Defense Procurement**: Excessive redactions, delayed responses
3. **Revenue Department**: Incomplete financial disclosures

## Systemic Issues Identified

### Staffing Problems
- Many departments lack dedicated RTI officers
- High turnover in information management roles
- Insufficient training on RTI compliance

### Technology Gaps
- Outdated record-keeping systems
- Lack of digital filing infrastructure
- Poor inter-department information sharing

### Cultural Resistance
- Some officials view RTI as burden rather than democratic right
- Informal policies to delay or discourage requests
- Lack of senior leadership commitment to transparency

## Reform Recommendations

### Immediate Actions Needed
1. **Mandatory Training**: All public officials must complete RTI compliance courses
2. **Digital Infrastructure**: Modernize record-keeping and response systems
3. **Performance Metrics**: Link RTI compliance to departmental evaluations

### Long-term Reforms
1. **Proactive Disclosure**: Publish routine information online automatically
2. **Independent Oversight**: Strengthen Information Commission powers
3. **Citizen Engagement**: Create user-friendly RTI portals and assistance programs

## Government Response

When contacted for comment, the Chief Information Commissioner stated: "We acknowledge these findings and are committed to working with departments to improve compliance and transparency."

## Impact on Democracy

Transparency advocate Dr. Priya Sharma emphasized: "RTI is not just about information access—it's about democratic accountability. These gaps undermine citizens' ability to hold government accountable."

This investigation was conducted in partnership with the Centre for Democratic Accountability and verified through multiple independent sources.`,
        readTime: 9,
        verifiedPct: 96,
        authorId: user3.id,
        tags: {
          connect: [{ id: rtiTag.id }],
        },
      },
      {
        title: 'Cultural Heritage Preservation Gets $50M Government Boost',
        slug: 'cultural-heritage-preservation-50m-government-boost',
        coverUrl: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        contentMd: `# Cultural Heritage Preservation Gets $50M Government Boost

The government announced a landmark $50 million investment in cultural heritage preservation, the largest such commitment in the nation's history.

## Program Overview

The **National Heritage Preservation Initiative** will focus on:

### Digital Archiving Projects
- **3D Documentation**: Advanced scanning of historical monuments
- **Manuscript Digitization**: Converting ancient texts to digital formats
- **Audio-Visual Archives**: Preserving traditional music and oral histories
- **Virtual Reality Experiences**: Making heritage sites accessible to global audiences

### Physical Restoration Programs
- **Monument Conservation**: Urgent repairs to 150 heritage structures
- **Archaeological Site Protection**: Enhanced security and climate control
- **Traditional Craft Workshops**: Preserving artisan skills and techniques
- **Museum Modernization**: Upgrading storage and display facilities

## Funding Breakdown

The $50 million allocation includes:
- **$20M**: Digital preservation technologies
- **$15M**: Physical restoration projects
- **$8M**: Community engagement programs
- **$4M**: Training and capacity building
- **$3M**: Research and documentation

## Community Involvement

### Local Partnerships
The initiative emphasizes community participation:
- **Heritage Ambassadors**: Training local guides and storytellers
- **School Programs**: Educational visits and heritage awareness
- **Volunteer Networks**: Engaging citizens in preservation activities
- **Cultural Festivals**: Celebrating and promoting local traditions

### Indigenous Heritage Focus
Special attention to indigenous cultural preservation:
- **Language Documentation**: Recording endangered dialects
- **Traditional Knowledge**: Preserving indigenous practices and wisdom
- **Sacred Site Protection**: Respecting and maintaining spiritual locations
- **Elder Interviews**: Capturing oral histories from community leaders

## Technology Integration

### Cutting-Edge Tools
- **LiDAR Scanning**: Precise 3D mapping of heritage sites
- **AI-Powered Analysis**: Automated damage assessment and monitoring
- **Blockchain Documentation**: Secure, tamper-proof heritage records
- **Mobile Apps**: Interactive heritage exploration tools

### Global Collaboration
Partnerships with international organizations:
- **UNESCO**: Technical expertise and best practices
- **Google Arts & Culture**: Digital platform integration
- **Academic Institutions**: Research collaboration and student exchanges

## Expected Outcomes

### 5-Year Goals
- **500,000 artifacts** digitally preserved
- **150 monuments** restored to original condition
- **50 endangered crafts** documented and taught
- **1 million students** engaged through educational programs

### Long-term Vision
- Establish the nation as a global leader in heritage preservation
- Create sustainable tourism based on cultural assets
- Strengthen cultural identity and national pride
- Generate economic opportunities in heritage sectors

## Expert Opinions

Cultural historian Dr. Rajesh Patel commented: "This investment recognizes that cultural heritage is not just about the past—it's about building a foundation for future generations."

Museum director Sarah Williams added: "The digital component is particularly exciting. We'll be able to share our treasures with the world while protecting the originals."

## Implementation Timeline

### Phase 1 (Months 1-12)
- Equipment procurement and setup
- Staff training and capacity building
- Community outreach and partnership development

### Phase 2 (Months 13-36)
- Major digitization projects launch
- Priority restoration work begins
- Educational programs roll out

### Phase 3 (Months 37-60)
- Full program implementation
- International collaboration expansion
- Impact assessment and program refinement

## Measuring Success

Key performance indicators include:
- **Preservation Metrics**: Number of artifacts and sites protected
- **Access Metrics**: Digital platform usage and educational engagement
- **Economic Impact**: Tourism revenue and job creation
- **Community Engagement**: Volunteer participation and local ownership

This comprehensive program represents a significant commitment to preserving the nation's rich cultural legacy for future generations.`,
        readTime: 6,
        verifiedPct: 88,
        authorId: user2.id,
        tags: {
          connect: [{ id: cultureTag.id }],
        },
      },
      {
        title: 'AI Revolution Transforms Healthcare Diagnosis and Treatment',
        slug: 'ai-revolution-transforms-healthcare-diagnosis-treatment',
        coverUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        contentMd: `# AI Revolution Transforms Healthcare Diagnosis and Treatment

Artificial intelligence is revolutionizing healthcare delivery, with new AI-powered diagnostic tools showing unprecedented accuracy in detecting diseases and personalizing treatment plans.

## Breakthrough Technologies

### Diagnostic AI Systems
Recent advances include:
- **Medical Imaging AI**: 95% accuracy in detecting early-stage cancers
- **Pathology Analysis**: Automated tissue sample examination
- **Radiology Enhancement**: Real-time image analysis and anomaly detection
- **Symptom Assessment**: AI-powered preliminary diagnosis tools

### Treatment Optimization
- **Personalized Medicine**: AI-driven treatment recommendations based on genetic profiles
- **Drug Discovery**: Machine learning accelerating pharmaceutical research
- **Surgical Robotics**: AI-assisted precision surgery with reduced complications
- **Recovery Monitoring**: Continuous patient monitoring and predictive analytics

## Real-World Impact

### Case Studies
**City General Hospital** reports:
- 40% reduction in diagnostic errors since implementing AI systems
- 25% faster treatment initiation for critical cases
- 60% improvement in early cancer detection rates

**Regional Medical Center** achievements:
- AI-powered drug interaction alerts prevented 200+ adverse events
- Predictive models reduced hospital readmissions by 30%
- Automated scheduling improved patient satisfaction scores by 45%

## Technology Adoption Challenges

### Implementation Barriers
- **Cost Considerations**: High initial investment in AI infrastructure
- **Training Requirements**: Medical staff need extensive AI literacy education
- **Data Privacy**: Ensuring patient information security and compliance
- **Integration Issues**: Connecting AI systems with existing medical records

### Regulatory Framework
- FDA approval processes for AI medical devices
- Liability questions for AI-assisted diagnoses
- International standards for AI healthcare applications
- Ethical guidelines for AI decision-making in medicine

## Future Developments

### Emerging Technologies
- **Quantum Computing**: Exponentially faster drug discovery and genetic analysis
- **Brain-Computer Interfaces**: Direct neural monitoring and treatment
- **Nanotechnology**: Microscopic robots for targeted drug delivery
- **Augmented Reality**: Enhanced surgical visualization and training

### 10-Year Projections
Experts predict:
- AI will assist in 80% of medical diagnoses
- Personalized treatment plans for every patient
- 50% reduction in healthcare costs through efficiency gains
- Virtual health assistants in every home

## Ethical Considerations

### Key Concerns
- **Algorithmic Bias**: Ensuring AI systems work equally well for all populations
- **Human Oversight**: Maintaining physician judgment in AI-assisted decisions
- **Data Ownership**: Patient rights over their medical data used in AI training
- **Access Equity**: Preventing AI from widening healthcare disparities

### Professional Impact
- **Job Evolution**: Healthcare workers adapting to AI-augmented roles
- **Skill Requirements**: New competencies needed for AI-integrated medicine
- **Patient Relationships**: Balancing technology with human care
- **Medical Education**: Curriculum updates to include AI literacy

## Global Perspective

### International Leadership
- **United States**: Leading in AI healthcare startups and research funding
- **China**: Massive datasets enabling rapid AI development
- **European Union**: Strong regulatory framework and ethical guidelines
- **Developing Nations**: Leapfrogging traditional healthcare infrastructure with AI

### Collaborative Efforts
- WHO guidelines for AI in healthcare
- International data sharing agreements
- Cross-border clinical trials using AI
- Global standards for AI medical devices

## Investment and Market Trends

### Funding Landscape
- $15 billion invested in healthcare AI startups in 2024
- Major tech companies expanding healthcare divisions
- Government grants supporting AI medical research
- Insurance companies investing in preventive AI tools

### Market Projections
- Healthcare AI market expected to reach $150 billion by 2030
- 35% annual growth rate in AI diagnostic tools
- Increasing adoption in developing countries
- New business models around AI-as-a-Service in healthcare

This transformation represents one of the most significant advances in medical history, promising better outcomes, reduced costs, and more accessible healthcare for all.`,
        readTime: 8,
        verifiedPct: 92,
        authorId: user1.id,
        tags: {
          connect: [{ id: technologyTag.id }, { id: healthTag.id }],
        },
      },
      {
        title: 'Climate Action Summit Yields Historic Global Agreement',
        slug: 'climate-action-summit-historic-global-agreement',
        coverUrl: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        contentMd: `# Climate Action Summit Yields Historic Global Agreement

World leaders reached a groundbreaking consensus at the Global Climate Action Summit, committing to unprecedented measures to combat climate change and achieve carbon neutrality by 2050.

## Summit Highlights

### Participating Nations
- **195 countries** signed the comprehensive climate accord
- **$500 billion** pledged for green technology development
- **Binding commitments** for emissions reduction targets
- **Technology sharing agreements** between developed and developing nations

### Key Commitments

#### Emissions Reduction
- **50% reduction** in global carbon emissions by 2030
- **Net-zero emissions** by 2050 for all signatory nations
- **Methane reduction** targets of 30% by 2030
- **Deforestation halt** by 2025

#### Renewable Energy Transition
- **80% renewable energy** in global mix by 2035
- **Coal phase-out** timeline established for all regions
- **Green hydrogen** production scaling initiatives
- **Energy storage** infrastructure development programs

## Financial Mechanisms

### Climate Fund Expansion
- **$100 billion annually** for developing nation climate adaptation
- **Green bonds** market expansion to $2 trillion
- **Carbon pricing** mechanisms in 75% of global economy
- **Fossil fuel subsidy elimination** by 2030

### Technology Transfer
- **Patent sharing** for critical green technologies
- **Capacity building** programs for emerging economies
- **Research collaboration** networks established
- **Innovation hubs** in every major region

## Sectoral Commitments

### Transportation Revolution
- **Electric vehicle** adoption targets: 50% of new sales by 2030
- **Public transit** investment doubling in urban areas
- **Aviation decarbonization** through sustainable fuels
- **Shipping industry** zero-emission vessel requirements

### Industrial Transformation
- **Steel and cement** industries commit to carbon neutrality by 2040
- **Chemical sector** pledges 60% emissions reduction
- **Manufacturing** efficiency improvements of 40%
- **Circular economy** principles adopted across industries

### Agriculture and Land Use
- **Sustainable farming** practices on 70% of agricultural land
- **Reforestation** of 350 million hectares by 2030
- **Soil carbon** sequestration programs launched
- **Food waste** reduction targets of 50%

## Implementation Framework

### Monitoring and Verification
- **Satellite monitoring** system for real-time emissions tracking
- **Independent verification** body established
- **Annual progress reports** mandatory for all nations
- **Penalty mechanisms** for non-compliance

### Governance Structure
- **Climate Council** with rotating leadership
- **Technical committees** for each major sector
- **Civil society** representation in decision-making
- **Youth advisory** panels for long-term perspective

## Scientific Backing

### IPCC Integration
- Agreement aligned with latest climate science
- **1.5°C warming limit** remains primary goal
- **Tipping point** prevention strategies included
- **Adaptation measures** for unavoidable impacts

### Research Priorities
- **Carbon capture** technology acceleration
- **Climate modeling** improvement initiatives
- **Ecosystem restoration** science advancement
- **Geoengineering** research governance frameworks

## Regional Perspectives

### Developed Nations
- **Historical responsibility** acknowledged through increased funding
- **Technology leadership** commitments made
- **Domestic policy** alignment with global targets
- **Just transition** support for affected workers

### Developing Countries
- **Development rights** balanced with climate action
- **Financial support** guarantees secured
- **Technology access** improved through partnerships
- **Capacity building** programs tailored to needs

### Small Island States
- **Survival imperative** recognized in agreement
- **Loss and damage** compensation mechanisms
- **Adaptation priority** funding allocated
- **Migration support** frameworks established

## Business and Industry Response

### Corporate Commitments
- **Fortune 500 companies** pledge science-based targets
- **Supply chain** decarbonization requirements
- **Green investment** criteria adopted
- **Sustainability reporting** standardized globally

### Financial Sector
- **Banks** commit to net-zero lending portfolios
- **Insurance** companies adjust risk models
- **Investment funds** divest from fossil fuels
- **Green finance** products expanded

## Civil Society Engagement

### Youth Movement
- **Greta Thunberg** addresses summit on intergenerational justice
- **Youth climate strikes** influence negotiations
- **Student representation** in national delegations
- **Future generations** rights enshrined in agreement

### Indigenous Rights
- **Traditional knowledge** integrated into climate solutions
- **Land rights** protection strengthened
- **Indigenous-led** conservation programs supported
- **Cultural preservation** linked to environmental protection

## Challenges and Criticisms

### Implementation Concerns
- **Enforcement mechanisms** considered insufficient by some
- **Timeline feasibility** questioned by industry groups
- **Funding adequacy** debated by developing nations
- **Political stability** risks in long-term commitments

### Activist Perspectives
- **Fossil fuel** industry influence criticized
- **Ambition gap** between commitments and science
- **Justice concerns** about burden distribution
- **Greenwashing** risks in corporate pledges

## Next Steps

### Immediate Actions (2024-2025)
- **National legislation** to implement commitments
- **Funding mechanisms** operationalization
- **Technology partnerships** establishment
- **Monitoring systems** deployment

### Medium-term Goals (2025-2030)
- **Emissions trajectory** verification and adjustment
- **Technology scaling** and cost reduction
- **Adaptation infrastructure** development
- **Just transition** program implementation

### Long-term Vision (2030-2050)
- **Carbon neutrality** achievement verification
- **Climate resilience** building completion
- **Sustainable development** goals integration
- **Global cooperation** institutionalization

This historic agreement represents humanity's most comprehensive response to the climate crisis, though its ultimate success will depend on rapid and sustained implementation across all sectors of society.`,
        readTime: 10,
        verifiedPct: 89,
        authorId: user3.id,
        tags: {
          connect: [{ id: environmentTag.id }, { id: politicsTag.id }],
        },
      },
    ]

    for (const article of articles) {
      await prisma.article.upsert({
        where: { slug: article.slug },
        update: {},
        create: article,
      })
    }

    console.log('Database seeded successfully with comprehensive articles!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
