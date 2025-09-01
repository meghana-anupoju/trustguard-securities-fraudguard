# Create comprehensive data for the fraud detection application
import json

# Fraud types and their detection methods data
fraud_types_data = {
    "fraudulent_advisors": {
        "description": "Fake investment advisors impersonating legitimate SEBI-registered professionals",
        "detection_methods": [
            "SEBI registration verification",
            "Cross-verification of contact details",
            "Check for Letter of Engagement requirement",
            "Verify fee collection methods",
            "Look for high-pressure sales tactics"
        ],
        "red_flags": [
            "Promises of guaranteed returns",
            "Cold calls and unsolicited messages",
            "No SEBI registration number provided",
            "Asking for payments to personal accounts",
            "Rushing investment decisions"
        ],
        "impact": "Individual financial losses, erosion of trust in legitimate advisors"
    },
    "deepfake_media": {
        "description": "AI-generated fake videos/audios of executives or fabricated regulatory documents",
        "detection_methods": [
            "Real-time deepfake detection algorithms",
            "Biometric analysis and liveness detection",
            "Cross-verification with official sources",
            "Behavioral pattern analysis",
            "Document authenticity verification"
        ],
        "red_flags": [
            "Unusual facial movements or audio quality",
            "Mismatched metadata or timestamps",
            "Inconsistent communication patterns",
            "Lack of official verification channels",
            "Sudden market-moving announcements"
        ],
        "impact": "Market manipulation, large-scale investor losses, regulatory scrutiny"
    },
    "social_media_manipulation": {
        "description": "Coordinated pump-and-dump schemes through WhatsApp/Telegram groups",
        "detection_methods": [
            "Pattern recognition in messaging frequency",
            "Sentiment analysis of group communications",
            "Bot detection algorithms",
            "Trading volume correlation analysis",
            "Network analysis of user connections"
        ],
        "red_flags": [
            "Synchronized messaging patterns",
            "Sudden spikes in stock promotion",
            "Fake user profiles or bots",
            "Coordinated buying/selling activities",
            "Anonymous or new accounts"
        ],
        "impact": "Retail investor losses, market volatility, undermined market integrity"
    },
    "fake_ipo_schemes": {
        "description": "Fraudsters posing as registered intermediaries for fake IPO investments",
        "detection_methods": [
            "Merchant banker registration verification",
            "Cross-check with official IPO listings",
            "Verify custodian credentials",
            "Check payment gateway authenticity",
            "Validate regulatory approvals"
        ],
        "red_flags": [
            "Guaranteed IPO allotments",
            "Unverified intermediary credentials",
            "Payments to unauthorized accounts",
            "Lack of proper documentation",
            "Pressure for immediate investment"
        ],
        "impact": "Direct financial fraud, loss of IPO market confidence"
    },
    "fake_trading_apps": {
        "description": "Counterfeit trading applications mimicking legitimate platforms",
        "detection_methods": [
            "App store verification",
            "Developer credential checking",
            "Digital signature validation",
            "API endpoint verification",
            "User interface authenticity checks"
        ],
        "red_flags": [
            "Downloaded from unofficial sources",
            "Excessive permissions requested",
            "Poor app quality or design",
            "Unrealistic return promises",
            "Inability to withdraw funds"
        ],
        "impact": "App-based fraud losses, identity theft, financial data compromise"
    },
    "false_corporate_announcements": {
        "description": "Misleading corporate announcements on stock exchanges",
        "detection_methods": [
            "Cross-verification with multiple sources",
            "Historical performance analysis",
            "Counterparty verification",
            "AI-based credibility scoring",
            "Real-time fact-checking systems"
        ],
        "red_flags": [
            "Sudden dramatic claims without history",
            "Lack of supporting documentation",
            "Inconsistent with company fundamentals",
            "Timing coincides with trading activity",
            "No counterparty confirmation"
        ],
        "impact": "Market manipulation, investor misguidance, regulatory violations"
    }
}

# Detection technologies and their capabilities
detection_technologies = {
    "ai_ml_algorithms": {
        "capabilities": ["Pattern recognition", "Anomaly detection", "Predictive analysis", "Real-time monitoring"],
        "applications": ["Social media monitoring", "Trading pattern analysis", "Document verification", "Behavioral analysis"]
    },
    "blockchain_verification": {
        "capabilities": ["Immutable record keeping", "Transparent verification", "Decentralized validation", "Cryptographic security"],
        "applications": ["Document authenticity", "Corporate announcement verification", "Transaction tracking", "Identity verification"]
    },
    "biometric_detection": {
        "capabilities": ["Facial recognition", "Voice pattern analysis", "Liveness detection", "Behavioral biometrics"],
        "applications": ["Deepfake detection", "Identity verification", "Account access security", "Video call authentication"]
    },
    "natural_language_processing": {
        "capabilities": ["Sentiment analysis", "Content classification", "Language pattern detection", "Fake text identification"],
        "applications": ["Social media monitoring", "Document analysis", "Communication pattern detection", "Automated fact-checking"]
    },
    "network_analysis": {
        "capabilities": ["Connection mapping", "Influence tracking", "Bot detection", "Coordination identification"],
        "applications": ["Social media manipulation", "Coordinated trading schemes", "Fake account networks", "Pump-and-dump detection"]
    }
}

# Regulatory framework and compliance requirements
regulatory_framework = {
    "sebi_regulations": {
        "investment_advisors": "SEBI (Investment Advisers) Regulations, 2013",
        "research_analysts": "SEBI (Research Analysts) Regulations, 2014",
        "brokers": "SEBI (Stock Brokers and Sub-Brokers) Regulations, 1992",
        "merchant_bankers": "SEBI (Merchant Bankers) Regulations, 1992"
    },
    "verification_systems": {
        "sebi_intermediary_database": "Official registry of authorized intermediaries",
        "scores_system": "SEBI Complaints Redress System",
        "cefcom_platform": "Central Fee Collection Mechanism",
        "validated_upi": "Verified UPI handles for registered entities"
    },
    "compliance_requirements": {
        "letter_of_engagement": "Mandatory agreement before advisory services",
        "fee_transparency": "Clear disclosure of all charges",
        "kyc_compliance": "Know Your Customer verification",
        "risk_disclosure": "Proper risk communication to investors"
    }
}

# Sample fraud detection rules and scoring system
detection_rules = {
    "advisor_verification": {
        "sebi_registration_check": {"weight": 0.4, "critical": True},
        "contact_verification": {"weight": 0.2, "critical": False},
        "fee_collection_method": {"weight": 0.2, "critical": True},
        "communication_pattern": {"weight": 0.2, "critical": False}
    },
    "social_media_monitoring": {
        "message_frequency_spike": {"weight": 0.3, "threshold": "500% increase in 24h"},
        "coordination_pattern": {"weight": 0.3, "threshold": "5+ accounts posting similar content"},
        "bot_detection": {"weight": 0.2, "threshold": "Automated behavior patterns"},
        "sentiment_manipulation": {"weight": 0.2, "threshold": "Sudden positive sentiment surge"}
    },
    "deepfake_detection": {
        "facial_inconsistencies": {"weight": 0.3, "threshold": "Biometric anomalies"},
        "audio_quality_analysis": {"weight": 0.2, "threshold": "Artificial speech patterns"},
        "metadata_verification": {"weight": 0.2, "threshold": "Timestamp inconsistencies"},
        "behavioral_patterns": {"weight": 0.3, "threshold": "Uncharacteristic communication"}
    }
}

# Create comprehensive dataset
fraud_detection_data = {
    "fraud_types": fraud_types_data,
    "detection_technologies": detection_technologies,
    "regulatory_framework": regulatory_framework,
    "detection_rules": detection_rules,
    "risk_scoring": {
        "high_risk": "Score >= 0.7",
        "medium_risk": "Score 0.4-0.69",
        "low_risk": "Score < 0.4"
    },
    "response_actions": {
        "high_risk": ["Immediate alert", "Transaction block", "Regulatory notification", "User warning"],
        "medium_risk": ["Enhanced monitoring", "User notification", "Additional verification"],
        "low_risk": ["Log for analysis", "Periodic review"]
    }
}

print("Fraud Detection System Data Structure Created")
print(f"Number of fraud types covered: {len(fraud_types_data)}")
print(f"Detection technologies available: {len(detection_technologies)}")
print(f"Regulatory compliance areas: {len(regulatory_framework)}")

# Convert to JSON format for the application
fraud_detection_json = json.dumps(fraud_detection_data, indent=2)
print("\nData successfully formatted for application integration")