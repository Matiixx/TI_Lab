#!/usr/bin/perl
use strict;
use XML::LibXML;
# Utworzenie instancji parser'a
my $parser = XML::LibXML->new();
my $source;
my $xmlfile="biblioteka.xml"; #plik z poprzednich zajec
# Wlaczenie opcji walidacji dokumentu XML przy pomocy DTD w parserze.
# Opcjonalnie walidacja jest wylaczona.
$parser->validation(1);
eval {
  $source = $parser->parse_file($xmlfile);
} ;
if ($@) {
  print "$xmlfile - Blad w czasie walidacji dokumentu ! \n";
  die "$@" ;
}
print "$xmlfile - Walidacja przeszla poprawnie.\n" ;