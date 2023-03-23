export interface AllMatches {
    id:                                    number;
    match_id:                              string;
    time:                                  string;
    league_id:                             number;
    comment:                               null;
    home_runs:                             null;
    away_runs:                             null;
    scoresheet_file_name:                  null;
    scoresheet_content_type:               null;
    scoresheet_file_size:                  null;
    scoresheet_updated_at:                 null;
    locked_for_clubs:                      boolean;
    created_at:                            string;
    updated_at:                            string;
    state:                                 AllMatchState;
    season:                                number;
    gamechanger_id:                        string;
    second_league_id:                      null;
    extra_rating_league_id:                null;
    allow_move_no_show:                    boolean;
    planned_innings:                       number;
    min_count_umpire:                      number;
    min_count_scorer:                      number;
    score_multiplier:                      number;
    home_placeholder:                      string;
    away_placeholder:                      string;
    corrected_scoresheet_file_name:        null;
    corrected_scoresheet_content_type:     null;
    corrected_scoresheet_file_size:        null;
    corrected_scoresheet_updated_at:       null;
    scoring_feedback_notification_sent_at: null;
    assignments_approved:                  boolean;
    extra_rating_league2_id:               null;
    livestream_url:                        null;
    assignments_approved_at:               null;
    human_state:                           string;
    human_score_multiplier:                null;
    scoresheet_url:                        null;
    home_league_entry:                     LeagueEntry;
    home_team_name:                        string;
    away_league_entry:                     LeagueEntry;
    away_team_name:                        string;
    league:                                League;
    field:                                 Field;
    umpire_selection:                      MatchResultReporterSelection;
    scorer_selection:                      MatchResultReporterSelection;
    match_result_reporter_selection:       MatchResultReporterSelection;
    scorer_assignments:                    any[];
    umpire_assignments:                    any[];
}

export interface LeagueEntry {
    id:                     number;
    created_at:             string;
    updated_at:             string;
    comment:                null;
    game_day:               null;
    not_competing:          boolean;
    state:                  string;
    parent_id:              number;
    cloned_from_id:         null;
    umpire_selector_id:     null;
    opaso_id:               null;
    current_player_list_id: null;
    human_game_day:         null;
    field:                  null;
    team:                   Team;
    contact_people:         any[];
}

export interface Team {
    name:           string;
    pool:           boolean;
    gamechanger:    null;
    cloned_from_id: null;
    short_name:     string;
    clubs:          MatchResultReporterSelection[];
}

export interface MatchResultReporterSelection {
    state?:                            string;
    number:                            number;
    cloned_from_id?:                   null;
    id:                                number;
    federation_id:                     number;
    organization_id:                   number;
    name:                              string;
    short_name:                        string;
    acronym:                           string;
    headquarter:                       string;
    main_club:                         string;
    chairman:                          string;
    registered_association:            string;
    court:                             string;
    contact_name:                      string;
    address_addon:                     string;
    street:                            string;
    postal_code:                       string;
    city:                              string;
    country:                           string;
    longitude:                         number;
    latitude:                          number;
    phone:                             string;
    phone_alt:                         string;
    mobile:                            string;
    mobile_alt:                        string;
    fax:                               string;
    fax_alt:                           string;
    mail:                              string;
    mail_alt:                          string;
    website:                           string;
    admission_date:                    Date;
    retirement_date:                   null;
    successes:                         string;
    opaso_id:                          number;
    billing_name:                      string | null;
    is_guest_club:                     boolean;
    player_list_notification_emails:   string;
    base_data_last_check_at:           string;
    billing_information_last_check_at: string;
    functions_last_check_at:           string;
    successes_html:                    string;
    logo_url:                          null | string;
    created_at?:                       string;
    updated_at?:                       string;
    type?:                             string;
}

export interface Field {
    id:                     number;
    name:                   string;
    description:            string;
    contact_name:           null;
    address_addon:          string;
    street:                 string;
    postal_code:            string;
    city:                   string;
    country:                string;
    longitude:              number;
    latitude:               number;
    spectator_total:        number | null;
    spectator_seats:        number | null;
    created_at:             string;
    updated_at:             string;
    other_information:      string;
    groundrules:            string;
    human_country:          string;
    description_html:       string;
    other_information_html: string;
    groundrules_html:       string;
    photo_url:              null | string;
    club:                   MatchResultReporterSelection;
}

export interface League {
    id:             number;
    season:         number;
    name:           string;
    acronym:        string;
    sport:          string;
    classification: string;
    sort:           number;
}

export enum AllMatchState {
    planned = "planned",
    played = "played",
    canceled = "canceled",
    noShow = "no_show",
    manuallyValued = "manually_valued",
    retreat = "retreat",
    exlusion = "exlusion",
}

// Converts JSON strings to/from your types
export class Convert {
    public static toAllMatches(json: string): AllMatches[] {
        return JSON.parse(json);
    }

    public static allMatchesToJson(value: AllMatches[]): string {
        return JSON.stringify(value);
    }
}